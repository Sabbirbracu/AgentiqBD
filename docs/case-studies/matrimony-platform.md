# ShaadiMart — Matrimony platform (case study source)

Source material supplied by the owner (2026-10-27) for the `matrimony-platform` project in `lib/content.ts`.
This is raw reference text, not published copy. Rewrite in the site's voice before it goes on a page
(see "Before publishing" at the bottom).

## Links

| | URL |
|---|---|
| Client's live production site (keeps changing under their own team) | https://shaadimartbd.com |
| Dev / handover build, exactly as delivered | https://dev.shaadimartbd.com |

The owner's own note: the dev URL is the one to showcase, so visitors judge the delivered work and not
later changes made by the client. Source Code link exists on the owner's portfolio but no URL was given.

## Screenshots (stored in `public/work/matrimony-platform/`)

| File | Shows | Notes |
|---|---|---|
| `mobile-landing.webp` (606×1086) | Mobile landing hero | |
| `web-landing.webp` (2000×1129) | Desktop landing hero with search bar and stats | Contains marketing claims ("2M+ users", "50K+ happy couples") written by the client's site. Do not repeat as our own figures. |
| `web-dashboard.webp` (2000×1081) | Member dashboard: profile completion, Find Your Match, daily picks, profile views, shortlist | The "Daily Match Picks" cards show broken-image alt text ("Ahmed Khan", "Fatima Begum"). Re-capture before using as a cover. |
| `web-messages.webp` (2000×1079) | Real-time chat: conversation list and thread | Test conversations. |
| `web-edit-profile.webp` (2000×1089) | Edit Profile, Lifestyle Details step | |

Screenshots show the owner's own test account (name and phone number) and test data.

---

## Headline

**ShaadiMart — Modern Matrimony Platform**

A full-featured matchmaking platform with secure authentication, real-time messaging, profile management,
and an optimized user experience built for long-term scalability.

## Executive summary

A founder came with an idea and a startup budget, no technical team. The product went from concept to a live,
revenue-ready matrimony platform, built by a sole engineer in six weeks.

- Shipped 8 major modules solo in 1.5 months: architecture, backend, frontend and production infrastructure.
- Protected the revenue model by enforcing 4 subscription tiers in backend authorization, so premium limits
  could not be bypassed from the client.
- Cut infrastructure cost structurally by choosing Cloudflare R2 over AWS S3, which removes egress fees for an
  image-heavy product.
- Shipped real-time chat and debugged a launch-blocking, production-only WebSocket/SSL failure.
- Owned deployment and reliability: Nginx, VPS, CI/CD and post-launch production fixes.

Key numbers: 1.5 months to production · 8 major modules · 4 subscription tiers · 2 user roles · 1 engineer.

## Project overview

- Type: Full stack
- Duration: 1.5 months
- Role: Full-stack product engineer (solo)
- Status: Live

## Context

Matrimony platforms live or die on three things: trust, communication and the integrity of the paywall.
Members share sensitive personal information and photos, expect meaningful conversations to happen safely,
and the whole business model depends on gating contact information behind paid tiers.

The founder had validated demand but had no engineering team, no architecture and a limited runway. He needed
a technical partner, not just a pair of hands.

## The challenge

Product and business problems disguised as technical ones:

1. How can members communicate safely and instantly? Chat is the core interaction, not a feature.
2. How can premium restrictions be enforced without breaking the business model? If a user can bypass a
   paywall through the client, recurring revenue collapses.
3. How can thousands of profile images be stored and served affordably? Image-heavy products get expensive
   fast, usually through bandwidth rather than storage.
4. How can all of this ship on a startup budget, quickly? Runway and time-to-market were first-class requirements.

### Constraints

- Solo engineer: architecture had to stay simple enough for one person to own end to end.
- Six-week window: the founder needed to be in market fast, which ruled out over-engineering.
- Startup budget: infrastructure choices had to minimise recurring cost, especially bandwidth.
- Sensitive user data: real names, photos and contact details demanded privacy-first defaults.
- Business-critical paywall: the access model could not be bolted on later.

## Approach

Deliberately did not start with code.

1. **Mapped the product first.** Walked the full user journey (registration, profile completion, discovery,
   connection, conversation, conversion to paid) against the business model.
2. **Backend before frontend.** Built and stabilised the Laravel API, data model and authorization rules first.
   Business rules were correct at the API layer, so the frontend could never become the place where security
   decisions lived.
3. **Frontend against a proven API.** Built the Next.js client on top of it with no rework from shifting contracts.
4. **Production last, and owned.** Deployed, configured and kept supporting the platform after launch.

That sequencing is the main reason six weeks was achievable.

## System architecture

A decoupled architecture with one rule: the backend is the single source of truth for every access decision.

- **Next.js + TypeScript client**: server-rendered, SEO-friendly, mobile-first.
- **Laravel REST API**: authentication, profiles, subscriptions and all authorization logic.
- **Laravel Sanctum**: token-based auth carrying subscription context.
- **MySQL**: relational integrity for users, profiles, subscriptions and messages.
- **Real-time layer**: Socket.io / WebSocket service for live messaging, proxied through Nginx over WSS.
- **Cloudflare R2**: profile image storage and delivery.
- **Nginx on a Hostinger VPS**: reverse proxy, SSL termination, static delivery.
- **GitHub Actions**: automated deployment pipeline.

Auth, profile, search and messaging were kept as separate concerns so a future mobile client can consume the
same API without rework.

### Access model: 2 roles, 4 tiers

The platform has 2 user roles (member and admin) with 4 subscription tiers layered on top of the member role.
Roles define what kind of user you are; tiers define what you have paid for. Keeping them separate means the
client can add, reprice or restructure packages without touching the permission system.

## Problems solved

### 1. Real-time communication, and the production-only failure
Live chat is the heart of the product, so a WebSocket messaging layer was built that respects membership
permissions in real time. Chat worked in development and failed in production. Cause: SSL and port
configuration. Secure pages cannot open insecure WebSocket connections, and connections were not surviving SSL
termination. Fix: Nginx as a reverse proxy carrying secure WSS traffic over port 443, resolving both the SSL
termination and the connection-stability problems. A launch-blocking issue that never appears on localhost.

### 2. Protecting premium revenue
The biggest commercial risk was users bypassing package limits, particularly around contact-information
visibility, which is both the core privacy feature and the main monetisation mechanism. Subscription-tier
authorization was implemented in the backend: every request for gated data is validated server-side against the
user's active tier. The client never decides what a user is entitled to; it only renders what the API permits.
Contact details, messaging and premium visibility behaved as intended across all four tiers and could not be
unlocked by manipulating the frontend.

### 3. Reducing infrastructure cost
An image-heavy platform would ordinarily default to AWS S3. The real risk was egress, the per-gigabyte cost of
serving images, which scales with growth. Cloudflare R2 offers S3-compatible storage with zero egress fees, so
the founder's costs stopped scaling with traffic. For a pre-revenue startup, preserving cash flow mattered as much
as any feature.

### 4. Reducing onboarding drop-off
Matrimony platforms need complete profiles to produce good matches, but long forms cause abandonment. Enforced
multi-step profile completion with progress indicators and inline validation: users always know how far they have
come, and errors surface immediately instead of on final submit.

## Modules delivered (8)

1. Authentication and authorization
2. Profile management with multi-step onboarding
3. Discovery and search
4. Real-time messaging
5. Subscription and membership packages
6. Media storage and delivery
7. Admin dashboard and moderation
8. Payment-ready architecture

## Engineering decisions and trade-offs

| Decision | Alternative considered | Rationale |
|---|---|---|
| Cloudflare R2 for images | AWS S3 | Zero egress fees; costs do not scale with traffic, decisive for a bootstrapped client |
| Backend-enforced authorization | Client-side gating | Revenue integrity; a paywall enforced in the browser is not a paywall |
| Laravel + Next.js (decoupled) | Monolithic framework | The same API can serve a future mobile app without a rewrite |
| MySQL | NoSQL | Subscriptions and user relationships are relational; transactional integrity matters for billing |
| Roles separated from tiers | Tier-as-role | Client can reprice or restructure packages without touching permissions |
| Self-managed VPS + Nginx | Managed PaaS | Much lower monthly cost, with full control over SSL and WebSocket proxying |

## Security and privacy

- Token-based authentication via Laravel Sanctum, with subscription state bound to authorization.
- Contact information private by default, revealed only through validated, paid access.
- Server-side validation on every request; no trust placed in client-supplied permissions.
- SSL/TLS across the platform, including secure WebSocket traffic.
- Admin moderation tools so the client can review members and act on reports.

## Deployment and production ownership

Shipped and ran the platform rather than handing off a repository.

- Configured Nginx for reverse proxying, SSL termination and WSS support.
- Deployed to a Hostinger VPS sized to the client's budget.
- Set up GitHub Actions for automated, repeatable deployments.
- Diagnosed and fixed live production issues after launch, including the WebSocket SSL failure.

## Tech stack

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Laravel, Laravel Sanctum
- Database: MySQL
- Real-time: Socket.io, WebSockets (WSS)
- DevOps: Nginx, Hostinger VPS, GitHub Actions
- Tools: Cloudflare R2

## Results and impact

| | |
|---|---|
| Time from idea to production | 1.5 months |
| Major modules shipped | 8 |
| Subscription tiers enforced | 4 |
| User roles | 2 (member, admin) |
| Engineers on the project | 1 |

Business impact:

- An idea became a live production platform in six weeks, built and deployed by one engineer.
- Recurring revenue protected through server-side enforcement across four tiers.
- Infrastructure costs structurally reduced by eliminating egress fees on image delivery.
- Higher engagement through real-time communication between members.
- Improved onboarding completion via staged profile creation with progress tracking.
- Operationally stable in production, with a deployment pipeline the client can build on.

Users: active users in Bangladesh (no figure given). Scale: production-grade platform.
Impact: improved onboarding completion (no figure given).

## What would be done differently

- Introduce automated testing earlier, especially around subscription authorization.
- Instrument analytics from day one, so the onboarding improvement could be proven numerically.
- Validate the production SSL/WebSocket path sooner, so the WSS issue is caught before launch week.

## Reflection

Building a SaaS product is not only about clean code. It is about understanding the business model well enough
to know which technical risks matter, then making engineering decisions that balance scalability, user
experience and the client's runway. The most valuable deliverables were a paywall that cannot be bypassed, an
infrastructure bill that does not grow with traffic, and a platform that stayed up after launch.

---

## Before publishing

- **Voice:** the source is first person ("I", sole engineer). The site speaks as Agentiq BD ("we", founder-led).
  Decide whether the case study reads as the founder's own work or as the agency's, then rewrite consistently.
- **Numbers to avoid inventing:** the owner gave no user counts or onboarding-completion percentages. Do not add any.
  The "2M+ users / 50K+ couples" figures in the landing screenshot are the client's marketing, not ours.
- **Naming:** the owner supplied the client name ShaadiMart and URLs. Confirm the client is happy to be named
  (the `projects` comment in `content.ts` says to name a client only with permission).
- **Privacy:** screenshots contain the owner's own test account name and phone number and test chat data.
- **Which URL is "Visit live site":** the owner prefers the dev build (`dev.shaadimartbd.com`).
