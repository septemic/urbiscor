# Google Ads measurement

The website's Google tag ID is `AW-18497720244`. Public IDs live in
`src/config/googleAds.ts`. No Ads account settings, campaign budget or bidding
are changed by the website integration.

## Form conversion target is pending

`quoteSendTo` is intentionally empty until the owner supplies the form action's
full target, `AW-18497720244/CONVERSION_LABEL`. An account ID alone is not a
conversion target. Empty or mismatched targets produce no conversion events.

Finish the Google Ads setup, then open Goals → Conversions → Summary → the
form action → Tag setup. The event snippet under manual installation contains
`send_to`; alternatively, the Use Google Tag Manager tab lists the Conversion
ID and Conversion label separately. Viewing that tab does not require using
Tag Manager. Automatically created goals may not have a standalone label;
create a manual website conversion action for the successful form if needed.

Suggested definition: **Solicitare ofertă – formular**, category Submit lead
form (Contact also works), Count One, no invented monetary value. Include the
validated action in the campaign's conversion goals. Avoid two Primary actions
measuring the same form. Do not use a page-load rule for the contact page: the
form confirms success inline rather than on a separate thank-you URL.

## Consent and delivery

- Google is not contacted before advertising consent, on a fresh refusal or
  when JavaScript is unavailable. A saved opt-in defers loading until idle, with
  a two-second maximum wait.
- The panel provides equally styled acceptance/refusal choices and the footer
  lets visitors revisit preferences. The first-party preference expires after
  180 days. Blocked storage defaults to no consent and an explicit choice is
  honored in memory during that visit.
- Basic consent gating is used. Measurement opt-in grants `ad_storage` and
  `ad_user_data`; analytics and ad personalization remain denied. Personalized
  advertising signals are disabled. The integration does not enable enhanced
  conversions or send form fields as Google event parameters.
- Withdrawing consent updates Google consent, clears queued leads, stops our
  conversion events and removes accessible first-party `_gcl_` cookies. Google
  may process the consent update itself; its already-loaded code cannot be
  unloaded from a running document. On subsequent documents the tag remains
  unloaded while the saved choice is refusal.
- A configured form event fires only after `/__forms.html` returns success.
  It carries the target and a random transaction ID, without names, email,
  phone, project details or monetary value. No events are backfilled after a
  visitor later opts in. Tracking is nonblocking and never determines form
  success or email delivery.
- The one shared tag is reused through client-side navigation. No tag manager,
  analytics SDK, new runtime dependency, poller or animation loop is added.

## Verification

Run `pnpm check:ads` (or `corepack pnpm check:ads` in the cloud environment) for
the offline Node checks. Tests substitute a test-only target and never contact
Google or send email. They cover gating, tag load/queue behavior, withdrawal
before and after load, preference expiry, malformed/blocked storage, cross-tab
changes, missing labels, duplicate script prevention and tag failure.

Browser verification uses intercepted form responses and a mocked Google tag.
Positive conversion tests use a local test-only label when the production
label is absent; production files are unchanged by that override. The checks
cover invalid/failed/successful submissions, exact event parameters, withdrawal,
no retroactive events, persistence, mobile widths, dark mode, keyboard focus,
blocked tags and no-JavaScript behavior. No real form emails or Google conversion
events are sent during these checks.

For a real base-tag diagnostic, use Google Tag Assistant on `https://urbiscor.ro`
and explicitly accept measurement in the site panel. A crawler that does not
grant consent may report no tag. Do not remove the consent gate to satisfy that
check. A supplied label plus a successful local test validates our event wiring;
Google Ads attribution and reporting still need confirmation after actual
consented customer activity.

## Performance

Before adding the final conversion label, the initial homepage HTML and eight
JavaScript assets added approximately 1.9 KB in gzip-compressed size. There are
no Google requests in initial HTML or before consent. Loading Google's tag after
opt-in has a third-party network/CPU cost; this is not a claim of zero overhead
for opted-in visits or a guaranteed PageSpeed score.
