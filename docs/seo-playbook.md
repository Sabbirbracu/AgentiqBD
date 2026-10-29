# Agentiq BD — SEO / GEO / AEO playbook

Last updated: 2026-10-27. What is built in code is listed first; what only the owner can do is listed after.

## Built into the site
| What | Where |
|---|---|
| XML sitemap (19 URLs) | `app/sitemap.ts` → `/sitemap.xml` |
| robots.txt (blocks `/brand/`, welcomes AI crawlers) | `app/robots.ts` |
| `llms.txt` for AI assistants | `public/llms.txt` |
| Canonical URLs, robots, OG/Twitter, keyword-led titles | `app/layout.tsx` + each page |
| JSON-LD: Organization/ProfessionalService, Person (founder), WebSite, SoftwareApplication, FAQPage, Service, BreadcrumbList, CreativeWork | `lib/seo.ts`, `components/seo/json-ld.tsx` |
| 9 service landing pages + `/services` hub | `app/services`, copy in `lib/service-pages.ts` |
| Internal links from home tiles, navbar and footer to service pages | `core-services.tsx`, `navbar.tsx`, `footer.tsx` |

When you add or rename a page, add it to `sitemapRoutes` in `lib/seo.ts` and bump `contentUpdated`.

## Submit to Google Search Console
1. Open https://search.google.com/search-console and sign in with the Google account that will own the site.
2. **Add property → Domain** and enter `agentiqbd.com`. Google shows a TXT record.
3. Add that TXT record in your domain registrar's DNS (Vercel DNS if the domain uses Vercel nameservers), then click **Verify**. (Alternative: URL-prefix property `https://www.agentiqbd.com/` with the HTML-tag method; put the code in the `NEXT_PUBLIC_GSC_VERIFICATION` env var in Vercel and redeploy.)
4. **Sitemaps** (left menu) → enter `sitemap.xml` → Submit. Status should read "Success" with 19 discovered pages.
5. **URL Inspection** → paste `https://www.agentiqbd.com/` → **Request indexing**. Repeat for `/services` and the 9 service pages.
6. Also submit the sitemap in Bing Webmaster Tools (https://www.bing.com/webmasters, "Import from Google Search Console" is one click). Bing feeds several AI assistants.

## Keyword map
Volumes below are from Semrush, shared by the owner on 2026-10-29 (database not stated, so treat them as global/US, not Bangladesh). Blank = not pulled yet. To see Bangladesh demand, switch the Semrush database to **Bangladesh (bd)** and re-run the same phrases.

| Target phrase | Page | Volume | KD% | Where it is used |
|---|---|---|---|---|
| agentic ai | `/services/ai-agents` | 90,500 | 96 | title, definition paragraph, FAQ, key terms |
| what is agentic ai / agentic ai definition | `/services/ai-agents` | 33,100 / 18,100 | 87 | FAQ "What is agentic AI?", key term |
| ai agents / ai agent | `/services/ai-agents` | 27,100 / 22,200 | 98 / 100 | H1, title |
| what is an ai agent / what are ai agents | `/services/ai-agents` | 14,800 / 6,600 | 90 / 86 | H2 "What is an AI agent?", key term |
| AI agent development company | `/services/ai-agents` | | | title, keywords |
| AI voice agent / AI receptionist | `/services/voice` | | | title, H1, H2, key terms |
| AI chatbot development / WhatsApp chatbot for business | `/services/chatbots` | | | |
| business process automation Bangladesh | `/services/workflow-automation` | | | |
| knowledge base software (US) | `/services/knowledge-rag` | 1.5M* | 50 | answer paragraph, keywords, key term |
| ai powered knowledge base software (US) | `/services/knowledge-rag` | 1,900 | 57 | title "AI Knowledge Base Software", H1, H2 |
| internal knowledge base software (US) | `/services/knowledge-rag` | 1,000 | 36 | meta description, keywords |
| what is knowledge base software (US) | `/services/knowledge-rag` | 50 | 39 | FAQ "What is knowledge base software?" |
| RAG development / knowledge base chatbot | `/services/knowledge-rag` | | | |
| AI integration services | `/services/integrations` | | | |
| ERP development Bangladesh / AI-enabled ERP | `/services/business-systems` | | | |
| software company in Bangladesh / software development company in Bangladesh | `/` and `/services/custom-software` | | | home title, custom-software title + H1, FAQ "How do I choose a software company in Bangladesh?" |
| AI company in Dhaka / AI company in Bangladesh | `/` | | | home keywords, Who we are copy |

\* "knowledge base software" (Semrush US, 2026-10-29): the trend chart shows two tall months and almost nothing since, so 1.5M is a spike, not steady demand. Most of these searchers want a ready-made tool (Guru, Confluence, Zendesk), so the page answers "buy or build?" honestly instead of competing as a product. Also skipped: "guru knowledge base software" (a brand), "free knowledge base software" (we do not offer free software), "best knowledge base software" (comparison lists; we do not claim "best").

Deliberately **not** targeted: "openclaw ai agent" and "ai voice agent zanus" (other companies' product names; we would not rank and it would mislead visitors) and "agentic ai coding tools" (a tool category we do not sell).

"Best software company in Bangladesh": the site never claims to be "the best" (house rule: no overclaiming). The page targets "software company in Bangladesh", which these searches contain. Google and AI assistants answer "best" queries from reviews and listings, so the levers are off-site: Clutch, GoodFirms and Google Business Profile reviews, plus mentions in "top software companies in Bangladesh" articles.

The KD 85–100 head terms (agentic ai, ai agents) are dominated by large publishers and will not rank quickly. What they are good for: AI assistants (GEO) quoting our definitions, and long-tail variants such as "AI agent development company in Bangladesh" that a new site can win.

"Agentiq" / "AgentIQ" alone is shared with NVIDIA's open-source AgentIQ toolkit and other companies, so rank for "Agentiq BD" and the service phrases above instead.

## Off-site work that moves rankings (owner)
- Google Business Profile for the Dhaka address (verify by postcard/phone). Biggest lever for "near me" and "Dhaka" searches.
- Fill the real social URLs in `site.social` and `founder.social` (`lib/content.ts`). They are added to `sameAs` automatically once they start with `http`.
- Same name, address and phone everywhere: LinkedIn company page, Facebook page, Clutch, GoodFirms, DesignRush.
- Ask live clients for a review and, with their permission, a backlink to their project.
- Publish the Blog ("Soon" in the menu). One practical article per target phrase, linking to its service page.
- Replace the placeholder Calendly URL (`site.bookingUrl`) with the real one.

## Measure
Search Console → Performance (queries, pages, position), Pages (indexing problems), Enhancements (structured data). Expect first indexing within days; ranking movement for competitive phrases takes months.

---

# GEO (Generative Engine Optimization) — added 2026-10-28

GEO = being the source that ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews quote or recommend. These engines answer from (1) pages they can fetch, (2) the Bing/Google indexes and (3) what *other sites* say about you. The first two are built; the third is the biggest open gap.

## Built in code
| What | Where |
|---|---|
| `llms.txt` and `llms-full.txt`, generated from site content (cannot drift from the pages) | `lib/llms.ts`, `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` |
| Answer-first definition paragraph + FAQ on every service page | `lib/service-pages.ts` (`answer`, `faqs`) |
| WebPage JSON-LD with `dateModified` + `about` → Organization, on home and service pages | `webPageJsonLd` in `lib/seo.ts` |
| AI crawlers allowed (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, …) | `app/robots.ts` |
| IndexNow submit (Bing → feeds ChatGPT search and Copilot) | `npm run indexnow` after each deploy; key file in `public/` |
| Name disambiguation from NVIDIA AgentIQ | `llms.txt`, JSON-LD `alternateName` |

Bump `contentUpdated` in `lib/seo.ts` whenever page copy really changes (it feeds `dateModified`, sitemap and llms-full).

## Owner actions (these move AI answers most)
1. **Bing Webmaster Tools**: add the site (import from Search Console). ChatGPT search and Copilot rely on Bing's index. Then run `npm run indexnow` once the key file is live.
2. **Entity profiles with identical name/address/phone/description**: LinkedIn company page, Facebook page, GitHub organisation, Crunchbase, Clutch, GoodFirms, Google Business Profile. Put the real URLs in `site.social` / `founder.social`; they flow into `sameAs` automatically.
3. **Third-party mentions**: AI engines trust what other sites say. Get listed in Bangladesh tech/startup directories, publish on LinkedIn/Medium/dev.to, answer questions on Reddit and Quora (genuinely, with disclosure), and ask clients for reviews.
4. **Citable content** (code-side next step): a /guides section with original, practical pieces such as "What does an AI chatbot cost to build in Bangladesh?", "AI Employee vs chatbot", "WhatsApp chatbot for business: how it works". Real experience from the four live projects beats generic text. Needs the owner's facts for any number.
5. **Bangla pages** for the same services: many Bangladeshi users ask AI assistants in Bangla.

## Measure (do monthly, 15 minutes)
Ask each assistant these prompts in a fresh chat and note whether Agentiq BD is named, cited or linked, and what is said:
- "Best AI agent development companies in Bangladesh"
- "Who builds AI chatbots for WhatsApp in Dhaka?"
- "AI automation company Bangladesh for small business"
- "What is Agentiq BD?"
- "ERP development company Bangladesh for pharmaceutical manufacturers"

Also check GA/Vercel analytics referrers for chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai. Expect little movement until items 2 and 3 are done; the site alone cannot make an unknown brand appear.
