// Tells Bing (and other IndexNow engines) which URLs changed.
//   npm run indexnow              → every URL in the sitemap (run after a deploy that changed many pages)
//   npm run indexnow -- --today   → only blog posts published today (Dhaka time) plus /blog; used by the daily workflow
// The key file lives at public/b78ca26f54c4482d63f28d22f0edf324.txt and must be reachable at https://www.agentiqbd.com/b78ca26f54c4482d63f28d22f0edf324.txt first.
const host = 'www.agentiqbd.com';
const key = 'b78ca26f54c4482d63f28d22f0edf324';
const todayOnly = process.argv.includes('--today');

const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: m[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? '',
}));

let urlList = entries.map((e) => e.loc).filter(Boolean);
if (todayOnly) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());
  const fresh = entries.filter((e) => e.loc?.includes('/blog/') && e.lastmod.startsWith(today)).map((e) => e.loc);
  if (!fresh.length) {
    console.log(`IndexNow: no blog post dated ${today} in the sitemap yet; nothing to submit.`);
    process.exit(0);
  }
  urlList = [...fresh, `https://${host}/blog`];
}
if (!urlList.length) throw new Error('No URLs found in the sitemap.');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
urlList.forEach((u) => console.log(`  ${u}`));
