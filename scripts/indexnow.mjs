// Tells Bing (and other IndexNow engines) which URLs changed. Run after each deploy:  npm run indexnow
// The key file lives at public/b78ca26f54c4482d63f28d22f0edf324.txt and must be reachable at https://www.agentiqbd.com/b78ca26f54c4482d63f28d22f0edf324.txt first.
const host = 'www.agentiqbd.com';
const key = 'b78ca26f54c4482d63f28d22f0edf324';

const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('No URLs found in the sitemap.');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
