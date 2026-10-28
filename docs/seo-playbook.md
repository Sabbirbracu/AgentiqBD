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

## Search volume
Real monthly volumes need a keyword tool (Google Keyword Planner, Ahrefs, Semrush). None was available to this session, so no numbers are listed here. Fill the column after pulling them.

| Target phrase | Page | Volume (fill in) |
|---|---|---|
| agentiq bd | `/` | |
| AI agent development company | `/services/ai-agents` | |
| AI agent development Bangladesh | `/services/ai-agents` | |
| AI chatbot development | `/services/chatbots` | |
| WhatsApp chatbot for business | `/services/chatbots` | |
| voice AI agent / AI receptionist | `/services/voice` | |
| business process automation Bangladesh | `/services/workflow-automation` | |
| RAG development / knowledge base chatbot | `/services/knowledge-rag` | |
| AI integration services | `/services/integrations` | |
| ERP development Bangladesh / AI-enabled ERP | `/services/business-systems` | |
| custom software development Bangladesh | `/services/custom-software` | |
| AI company in Dhaka / AI automation company Bangladesh | `/` | |

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
