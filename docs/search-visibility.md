# Search visibility and indexing

Audit date: 6 October 2026. The owner has confirmed that `urbiscor.ro` was added
to Google Search Console and domain ownership was verified. The owner's URL
inspection screenshots report **URL is unknown to Google**, with no recorded
crawl or referring sitemap. This identifies a discovery gap in the report;
the live-test result is still needed to verify Google's current ability to
fetch and index the page. Site-wide coverage and query rankings require the
property's reports.

## What the public audit established

- The original seven pages return static HTML with readable headings, text,
  internal links, unique descriptions and self-referencing canonical URLs.
  Crawling is allowed. The sitemap and robots file return HTTP 200.
- HTTP and `www` already redirect to `https://urbiscor.ro`. An unknown URL
  returns a genuine HTTP 404.
- `.html` versions and `urbiscor.netlify.app` previously returned duplicate
  HTML with canonical tags. Explicit permanent redirects now consolidate these
  URLs while preserving `/__forms.html` for the contact form.
- Public Bing and DuckDuckGo `site:urbiscor.ro` queries returned no results in
  this environment. Google public search could not be verified here. These
  checks are discovery signals, not an authoritative index count or ranking
  report; Search Console and Bing Webmaster Tools provide that evidence.
- DNS already contained a Google verification record. It was preserved, along
  with the existing email configuration. No DNS records were changed.

## Website improvements

Six distinct, prerendered service pages now explain scope, project preparation
and common questions, with relevant free-quote links:

- https://urbiscor.ro/servicii/constructii-case-la-rosu
- https://urbiscor.ro/servicii/fundatii
- https://urbiscor.ro/servicii/structuri-beton-armat
- https://urbiscor.ro/servicii/cofrare-doka
- https://urbiscor.ro/servicii/turnare-beton
- https://urbiscor.ro/servicii/zidarie

The service index, homepage cards and related-service links make these pages
crawlable. The sitemap contains all 13 indexable pages. Metadata is unique;
linked WebSite, business, WebPage, Service and BreadcrumbList entities use
consistent public URLs. These entities help describe the site; they do not
guarantee rich results or higher positions. No ratings, reviews, address,
prices or availability were invented. FAQ answers use native HTML disclosures;
FAQ rich-result markup was not added.

Only the already-established Oltenia service area is used. Confirm actual
towns/counties before adding more specific local content. Do not create copies
of the same page for every town or claim local offices that do not exist.
Photographs remain clearly labelled illustrations until real work is supplied.

Detailed service content stays in lazy route chunks. The homepage retains its
eight initial JavaScript files and adds approximately 1.8KB compressed across
HTML and initial JavaScript in equivalent local builds. No dependencies,
tracking, third-party browser scripts or animation loops were added.

Lighthouse 13.5 lab checks measured **98 mobile / 100 desktop performance** and
**100 technical SEO** on both profiles, using a warmed verified-HTTPS bridge.
Mobile FCP was 0.9s, LCP 2.3s, blocking time 40ms and layout shift zero. These
checks cover selected technical criteria; an SEO score of 100 is not an index
status, keyword rank or guarantee. Build/TypeScript checks and browser validation
cover all 13 generated pages, metadata/schema updates during navigation, native
FAQs, breadcrumbs, quote navigation, responsive layouts and no-JavaScript use.

## Complete Google Search Console setup

1. Select the verified **Domain property `urbiscor.ro`**. Under **Indexing →
   Sitemaps**, submit `https://urbiscor.ro/sitemap.xml`. Check for **Success**
   and review the discovered URL count after Google processes the sitemap.
   If the sitemap is already submitted successfully, allow processing rather
   than repeatedly resubmitting it. Referring-sitemap information can lag.
2. Use **URL inspection** for the homepage and the six service URLs above.
   If a URL is not indexed, read the reason, run **Test live URL**, and use
   **Request indexing** when the live page is available to Google. Do not
   repeatedly request the same URL or submit `.html`, preview or tracking URLs.
3. Under **Indexing → Pages**, examine excluded URLs and the examples shown.
   A redirect or alternate URL with the right canonical is usually expected.
   Investigate blocked URLs, server errors and unexpected canonical choices.
   `Discovered/Crawled — currently not indexed` needs assessment of crawl
   history, content value and internal links; another request alone is not a
   universal fix.
4. Check **Manual actions** and **Security issues**. Review **Core Web Vitals**
   when field data is available; a new/low-traffic property may have no data.
5. Under **Performance → Search results**, monitor queries and landing pages
   for Romanian searches over time. Track relevant impressions, clicks and
   enquiries. Average position depends on the query, location and device and
   should not be treated as a single fixed website rank.

For the owner's current **URL is unknown to Google** status, prioritize sitemap
submission and a successful live test followed by a homepage indexing request.
The `N/A` crawl/canonical rows mean the report has no recorded crawl data; they
are not separate diagnosed errors. Also inspect the main service page at
`https://urbiscor.ro/servicii/constructii-case-la-rosu` and the other important
service URLs after publication. The sitemap is sufficient to list all pages;
individual requests are useful for priority URLs, not a repeated daily task.

Search Console reports may take time to populate. A submitted sitemap or a
successful live test does not mean the URL is already indexed. Requests do not
guarantee inclusion, a deadline or a particular ranking.

## Improve local visibility and business credibility

Create or claim the real [Google Business Profile](https://www.google.com/business/)
and complete Google's verification. Use the actual business name, phone,
website and the closest available construction category. Add accurate services
and confirmed service areas. Use the real business address for verification;
hide it from customers if it is a service-area business that does not receive
customers there. Avoid duplicate profiles and invented locations.

Replace illustrative portfolio images with real project photographs, with
permission, useful captions and accurate locality/scope. Ask actual customers
for honest reviews without incentives. Keep business details consistent across
the website, social profiles and relevant legitimate business listings. Useful
project case studies and relevant local mentions provide stronger evidence
than repeating keywords or buying links. None of this requires browser tracking.

## Bing and other participating engines

Add/verify the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/)
or import the verified Search Console property, and submit the same sitemap.
The public `indexnow-key.txt` file is an ownership proof for IndexNow, not a
private account credential. After publishing a content update, run:

```bash
NODE_USE_ENV_PROXY=1 node scripts/indexnow.mjs --dry-run
NODE_USE_ENV_PROXY=1 node scripts/indexnow.mjs
```

The script first checks that the matching ownership file is live, then sends
the sitemap URLs to the IndexNow endpoint. HTTP 200 means the URLs were received;
202 means ownership validation is pending. Neither response guarantees indexing.
IndexNow serves participating engines such as Bing; it does not submit pages
to Google's index. The script runs outside the browser and needs no user data.

## Official references

- [Google indexing and URL inspection](https://support.google.com/webmasters/answer/9012289)
- [Submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [SEO guidance](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Business Profile guidelines](https://support.google.com/business/answer/3038177)
- [IndexNow protocol](https://www.indexnow.org/documentation)
