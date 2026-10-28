# Deploying Agentiq BD to the Hostinger VPS

> **Partly superseded (2026-10-28).** The server turned out to use a Docker-based shared front door, now living in `/opt/proxy` (see `vps-infra/proxy/RUNBOOK.md`). Parts 0, 1 and 8 here are still good background reading. For the actual deploy steps, ports (none are published now), secret names (`DEPLOY_*`) and the nginx site file, follow the step-by-step guide in the chat history / `vps-infra`, not Parts 4 to 6 below.

A learning-first guide. Read Part 0 once, then follow the steps in order. Every command says **where** it runs: 💻 your Mac, 🖥️ the VPS (over SSH), or 🐙 GitHub.

Replace `YOURDOMAIN.com` with your real domain everywhere.

---

## Part 0 — The mental model (the part you forgot last time)

A deployment is just **getting your code running on a computer that is always on, and reachable by a domain name over HTTPS**. Everything else is detail. The pieces:

```
 Visitor types https://YOURDOMAIN.com
        │
        ▼
 DNS ──────────── "YOURDOMAIN.com  →  your VPS IP"          (set at your domain registrar)
        │
        ▼
 VPS :80 / :443 ─ REVERSE PROXY (Nginx/Traefik/Caddy)         (ONE per server; owns ports 80 & 443)
        │            reads the requested domain name and forwards:
        ├── erp.example.com        → ERP container
        ├── portfolio.example.com  → Portfolio container
        ├── YOURDOMAIN.com         → agentiqbd-web container   ← NEW
        └── admin.YOURDOMAIN.com   → admin container            ← LATER
```

| Term | Plain meaning |
| --- | --- |
| **VPS** | A rented Linux computer (your Hostinger KVM 2). Many apps share it. |
| **Docker image** | A frozen, ready-to-run package of your app + everything it needs (like a zip you can start). |
| **Container** | A running copy of an image, isolated from other containers (like a tiny separate computer process). |
| **Dockerfile** | The recipe that builds the image. |
| **Docker Compose** | A small file (`docker-compose.yml`) describing which containers to run and how. One command starts them all. |
| **Registry (GHCR)** | A storage place for images. GitHub's is `ghcr.io`, free with your account. |
| **Port** | A numbered door on a computer. Only ONE program can use a given port, so every app needs its own number. |
| **Reverse proxy** | The receptionist: listens on 80/443 and routes each domain to the right container. |
| **DNS A record** | "this domain name → this IP address". |
| **SSL / HTTPS** | The padlock. Free certificates come from Let's Encrypt (via Certbot, or automatic in Traefik/Caddy). |
| **CI/CD (GitHub Actions)** | A robot on GitHub that, on every `git push`, tests → builds → ships → restarts your app. |
| **SSH key** | A key pair. The *public* half sits on the server, the *private* half goes in a GitHub secret. Lets the robot log in without a password. |

### The deployment flow we are building

```
 you: git push main
        │
        ▼
 🐙 GitHub Actions
   1. check   → npm ci + typecheck           (fails early, server untouched)
   2. build   → docker build → push to GHCR   (done on GitHub's machines, NOT your VPS)
   3. deploy  → SSH into VPS → docker compose pull + up -d → only agentiqbd restarts
        │
        ▼
 🖥️ VPS: /opt/apps/agentiqbd/   (own folder, own compose project, own container, own port)
```

**Why build on GitHub and not on the VPS?** A Next.js build can use 1–2 GB RAM and all CPU for a minute. Doing that on a shared server can slow down or crash your ERP. Building elsewhere and only *pulling* keeps the VPS calm.

**Why can't this break your other apps?** Each stack gets: its own folder, its own compose project name, its own container name, its own localhost-only port, and memory/CPU limits. We never edit another app's files, and we only *add* one new proxy entry.

---

## Part 1 — Safety net (5 minutes, do this first)

1. **Take a snapshot** in Hostinger hPanel → VPS → *Backups & Monitoring* → *Create snapshot*. If anything goes badly wrong you can restore the whole server. (Only one snapshot is kept at a time, so this overwrites an older one.)
2. Keep a second SSH window open while you work. If you break something, you still have a live session to undo it.

---

## Part 2 — Audit the VPS (read-only; changes nothing)

💻 Connect: `ssh YOUR_USER@YOUR_VPS_IP` (the same way you already do for your other deployments).

🖥️ Run these. **None of them modify anything.**

```bash
# Who/what is this machine?
whoami; hostname; cat /etc/os-release | head -3; uptime

# How much room do I have? (KVM 2 is normally 2 vCPU / 8 GB RAM / 100 GB disk)
nproc; free -h; df -h /

# What is running, and which ports does each use?
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
docker compose ls
docker network ls

# Who owns ports 80 and 443 (this is THE most important answer)?
sudo ss -tlnp | grep -E ':(80|443|3[0-9]{3}|8[0-9]{3}) '

# Is the reverse proxy a system service or a container?
systemctl is-active nginx apache2 caddy 2>/dev/null
ls /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null

# Where do the existing apps live? What is the load right now?
ls /opt /srv /var/www /home 2>/dev/null
docker stats --no-stream

# Firewall state (just look)
sudo ufw status 2>/dev/null
```

### How to read the results

| You see… | It means | What we do |
| --- | --- | --- |
| `nginx` is `active`, and `ss` shows `nginx` on `:80`/`:443` | **Case A:** Nginx installed directly on the server | Add one new file in `/etc/nginx/sites-available/` |
| `ss` shows `docker-proxy` on `:80`/`:443`, and `docker ps` lists `traefik`, `nginx-proxy-manager`/`npm`, `caddy`, or `nginx-proxy` | **Case B:** the proxy is itself a container | Join your app to the proxy's Docker network |
| Ports like `3000, 3001, 3002, 8000, 8080` already listed | Those are taken | Pick a free one for us (default in the files: `3010`) |
| `free -h` shows "available" below ~1.5 GB | Server is tight | We keep the 512 MB limit, and defer adding Postgres/Redis |

> 📋 **Paste the output of the audit back to Claude** (nothing in it is secret — just remove anything you don't want to share). The proxy section of Part 6 depends on it, and the port/network choices get finalised from it.

---

## Part 3 — DNS

At your domain registrar (or Cloudflare, if that's where DNS lives), add:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | your VPS IP |
| A | `www` | your VPS IP |
| A | `admin` | your VPS IP *(add now or later; harmless until the admin app exists)* |

- If you use **Cloudflare**, keep the records on *DNS only* (grey cloud) until HTTPS works on the server, then you can turn the orange cloud on (and set SSL mode to *Full (strict)*).
- DNS can take minutes to hours. Check with 💻 `dig +short YOURDOMAIN.com`.

---

## Part 4 — Prepare the server folder and the deploy key

### 4.1 Make the app folder (🖥️)

```bash
sudo mkdir -p /opt/apps/agentiqbd
sudo chown "$USER":"$USER" /opt/apps/agentiqbd
```

`/opt/apps/<name>/` is the convention used here: one folder per project. (If your existing apps live somewhere else, put this one next to them instead and update `APP_DIR` in the workflow.)

### 4.2 Make a dedicated SSH key for this project (💻)

```bash
ssh-keygen -t ed25519 -f ~/.ssh/agentiqbd_deploy -C "github-actions-agentiqbd" -N ""
```

This creates two files: `agentiqbd_deploy` (**private**, goes to GitHub) and `agentiqbd_deploy.pub` (**public**, goes to the server). One key per project means you can revoke one without touching the others.

Install the public half on the server (💻):

```bash
ssh-copy-id -i ~/.ssh/agentiqbd_deploy.pub YOUR_USER@YOUR_VPS_IP
```

Test that the robot's key works and can use Docker (💻):

```bash
ssh -i ~/.ssh/agentiqbd_deploy YOUR_USER@YOUR_VPS_IP "docker ps | head -3"
```

If that prints containers, the key is good. (`YOUR_USER` should be the same user your other GitHub workflows deploy as — it already has Docker permission.)

---

## Part 5 — Connect GitHub

🐙 In the repo **Sabbirbracu/AgentiqBD** → *Settings* → *Secrets and variables* → *Actions*.

**Secrets** (hidden values):

| Name | Value |
| --- | --- |
| `VPS_HOST` | your VPS IP |
| `VPS_USER` | the SSH user from Part 4 |
| `VPS_SSH_KEY` | the **private** key: 💻 `pbcopy < ~/.ssh/agentiqbd_deploy` then paste (include the BEGIN/END lines) |
| `VPS_PORT` | *(only if SSH is not on 22)* |

**Variables** (visible values, not secret):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_GSC_VERIFICATION` | your Google Search Console token, if you have it (can be empty) |
| `SITE_URL` | `https://YOURDOMAIN.com` — **add this later**, in Part 7, after HTTPS works. It switches on the final smoke test. |

> 🔑 Rule of thumb: **never** put passwords, API keys, or `.env` contents in the repo. They live in GitHub Secrets (for the robot) or in a `.env` file on the server (for the running app, later for the backend).

---

## Part 6 — The reverse proxy entry (this is the only change to shared infrastructure)

First choose a free port (default `3010`). Make sure it didn't show up in the audit: 🖥️ `sudo ss -tlnp | grep :3010` should print nothing.

### Case A — Nginx installed on the server

🖥️ Create a **new** file (do not edit your other sites' files):

```bash
sudo nano /etc/nginx/sites-available/agentiqbd
```

```nginx
server {
    listen 80;
    server_name YOURDOMAIN.com www.YOURDOMAIN.com;

    location / {
        proxy_pass http://127.0.0.1:3010;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable it, **test the config before applying it**, then *reload* (a reload keeps all existing connections alive; a restart does not):

```bash
sudo ln -s /etc/nginx/sites-available/agentiqbd /etc/nginx/sites-enabled/agentiqbd
sudo nginx -t                      # must say "syntax is ok" and "test is successful"
sudo systemctl reload nginx
```

If `nginx -t` complains, **do not reload**. Fix the file (or delete the symlink) first. This one habit is what protects your other sites.

Get HTTPS (after DNS from Part 3 points to the VPS):

```bash
sudo certbot --nginx -d YOURDOMAIN.com -d www.YOURDOMAIN.com
```

Certbot edits only the agentiqbd file, adds the padlock, and sets up auto-renewal.

### Case B — The proxy runs in Docker (Traefik / Nginx Proxy Manager / Caddy)

Here the app joins the proxy's Docker network, and the proxy reaches it by container name. You then do **not** publish a host port at all.

1. 🖥️ Find the proxy network: `docker network ls` and `docker inspect <proxy-container> | grep -A5 Networks`.
2. In `deploy/docker-compose.yml`, remove `ports:` and enable the `networks` block at the bottom with that network name.
3. Register the route:
   - **Nginx Proxy Manager:** web UI → *Add Proxy Host* → domain `YOURDOMAIN.com` → forward host `agentiqbd-web`, port `3000` → *SSL* tab → request a Let's Encrypt certificate.
   - **Traefik:** add labels to the `web` service, matching how your other apps do it:
     ```yaml
     labels:
       - traefik.enable=true
       - traefik.http.routers.agentiqbd.rule=Host(`YOURDOMAIN.com`) || Host(`www.YOURDOMAIN.com`)
       - traefik.http.routers.agentiqbd.entrypoints=websecure
       - traefik.http.routers.agentiqbd.tls.certresolver=<your resolver name>
       - traefik.http.services.agentiqbd.loadbalancer.server.port=3000
     ```
   - **Caddy:** add a block `YOURDOMAIN.com { reverse_proxy agentiqbd-web:3000 }` to the Caddyfile and reload Caddy.

Copy exactly what one of your existing apps does; consistency beats cleverness.

---

## Part 7 — First deploy

💻 In the `frontend` folder, commit the new files and push:

```bash
git add Dockerfile .dockerignore next.config.mjs deploy .github docs/deployment-guide.md
git commit -m "Add Docker + GitHub Actions deployment"
git push origin main
```

🐙 Watch it run: repo → *Actions* tab → "Deploy frontend". Each of the three jobs (check → build → deploy) shows live logs. A red ✗ shows exactly which step failed.

Then verify:

```bash
# 🖥️ container is up and healthy
docker ps --filter name=agentiqbd
docker logs --tail 50 agentiqbd-web

# 🖥️ the app answers locally (Case A)
curl -I http://127.0.0.1:3010

# 💻 the world sees it
curl -I https://YOURDOMAIN.com
```

Finally add the `SITE_URL` variable (Part 5) so every future deploy ends with an automatic smoke test.

**Check that nothing else was disturbed:** 🖥️ `docker ps` — your other containers should show the same uptime as before.

---

## Part 8 — Everyday operations

| I want to… | Command (🖥️ unless noted) |
| --- | --- |
| Deploy a change | 💻 `git push origin main` — that's it |
| See the app's logs | `docker logs -f --tail 100 agentiqbd-web` |
| Restart only this app | `cd /opt/apps/agentiqbd && docker compose restart` |
| Check CPU/RAM | `docker stats --no-stream` |
| **Roll back** a bad release | `cd /opt/apps/agentiqbd && IMAGE_TAG=<older-commit-sha> docker compose up -d` (every deploy is tagged with its git SHA) |
| Re-run a deploy without a code change | 🐙 Actions → Deploy frontend → *Run workflow* |
| See disk used by Docker | `docker system df` |

### Golden rules for a shared server

- ❌ Never `docker system prune -a`, `docker rm $(docker ps -aq)` or `docker stop $(docker ps -q)` — they hit **every** project's containers and images.
- ❌ Never run `docker compose down` outside this app's folder.
- ✅ Always `cd /opt/apps/agentiqbd` first, so compose only sees this stack.
- ✅ `sudo nginx -t` before every `reload`.
- ✅ Add new config files; don't edit other apps' files.
- ✅ Don't turn on / change `ufw` as part of this: Docker-published ports bypass it anyway, and a wrong rule can lock you out of SSH or take the other sites offline. Use Hostinger's panel firewall if you want one.

---

## Part 9 — When the backend, RAG chatbot, booking and admin arrive

The same pattern, just more services in one compose file. Only the things people must reach get a domain; databases never do.

```
 agentiqbd.com           → web    (Next.js public site)           port 3010
 api.agentiqbd.com       → api    (backend: leads, chatbot, booking) port 3011
 admin.agentiqbd.com     → admin  (CRM + transactions dashboard)   port 3012
                           db     (Postgres + pgvector for RAG)    NO port, internal only
                           redis  (queues / sessions, if needed)   NO port, internal only
```

Decisions to make when you start the backend (not now):

1. **Repo layout.** Your Git repo currently starts at `frontend/`. A single repo with `frontend/`, `backend/`, `admin/` (monorepo) keeps releases in sync; the workflow then uses `paths:` filters so a frontend-only change only rebuilds the frontend.
2. **Admin panel.** A separate app on `admin.` is the safest: its own login, its own container, can be restricted (IP allow-list, 2FA) without touching the public site. Never put admin routes inside the public site's container.
3. **Database.** Postgres with the `pgvector` extension covers CRM, bookings **and** RAG embeddings in one place. Use a named Docker volume and schedule `pg_dump` backups off the server (Hostinger snapshots alone are not enough for a database). Check the RAM numbers from your audit first; Postgres + API + admin adds roughly 1–1.5 GB.
4. **LLM usage.** Call hosted models by API (Claude etc.). Don't try to run a local model on a KVM 2.
5. **Secrets.** Backend config (`DATABASE_URL`, API keys) goes in a `.env` file at `/opt/apps/agentiqbd/.env` on the server, `chmod 600`, referenced by `env_file:` in compose, and never committed.

---

## Troubleshooting

| Symptom | Likely cause → fix |
| --- | --- |
| Actions: `check` fails | Type error. Run `npm run typecheck` on your Mac and fix. Server untouched. |
| Actions: `build` fails on `npm ci` | `package-lock.json` out of sync. Run `npm install` locally and commit the lockfile. |
| Actions: `deploy` → `Permission denied (publickey)` | Wrong/incomplete `VPS_SSH_KEY` secret (needs full BEGIN/END lines), or the public key isn't in the server user's `~/.ssh/authorized_keys`. Re-test with the command in Part 4.2. |
| Actions: `docker compose` → "permission denied … docker.sock" | The SSH user isn't in the `docker` group. Use the same user your other deployments use. |
| `pull access denied` / `unauthorized` | Image path typo (must be lowercase), or the `packages: write` permission was blocked in repo *Settings → Actions → General → Workflow permissions*. |
| `port is already allocated` / `address already in use` | Another app owns that port. Pick a different `HOST_PORT` (re-check with `ss -tlnp`). |
| Site shows **502 Bad Gateway** | Proxy can't reach the container: it's down (`docker ps`, `docker logs agentiqbd-web`) or the port in the proxy config doesn't match the compose port. |
| Site shows another app | `server_name` / Host rule doesn't match, or DNS isn't pointed at the VPS yet. |
| Certbot fails | DNS not propagated yet, or Cloudflare orange-cloud proxying is interfering. Wait / switch to DNS-only, retry. |
| Container restarts in a loop | `docker logs agentiqbd-web` shows the error. `docker inspect agentiqbd-web \| grep -i oom` — if OOM-killed, raise `mem_limit`. |
| Page loads but old content | Browser/Cloudflare cache. Hard-refresh; purge Cloudflare cache. |
