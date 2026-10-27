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
