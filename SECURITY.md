# Security

## Supported release

The initial 1.x implementation is under development. Support only the latest patched dependencies compatible with this application. Scheduled Dependabot version-update PRs are paused at the owner's request; audit and test every dependency update before publishing it.

## Reporting

Do not publish customer data, credentials or exploit details in a public issue. Use the repository's private vulnerability reporting feature if enabled, or contact the owner through a verified business contact once supplied. A security email has not been invented. Enabling private reporting and confirming an owner contact remain launch tasks.

## Controls

- Server-side Zod validation, strict field allowlist, Unicode name validation, Indian mobile format, bounded email/message and fixed service selection.
- 12,000-byte streaming body limit, JSON-only POST endpoint, exact comparison against the normalized configured origin and no permissive CORS.
- Distributed Upstash sliding-window limits: three submissions per hashed IP per ten minutes, plus 40 total per hour. Timeout or service failure blocks delivery. No in-memory security fallback.
- On Vercel, use platform-overwritten `x-vercel-forwarded-for`. The handler refuses delivery on unsupported hosting until a trusted ingress adapter is implemented. Do not trust arbitrary `x-forwarded-for`.
- Honeypot rejects populated fields with a visible 400 response; it never reports a false delivery success. Hexadecimal UUID v4 keys and email-provider idempotency protect retries. Global throttling reduces quota exhaustion but can deny legitimate enquiries during abuse. Monitor and consider Turnstile if needed.
- Resend receives plain text with a fixed subject. Validated email is only used as reply-to; messages are never interpreted as HTML. Email acceptance is distinguished from confirmed inbox arrival.
- Secrets stay server-side. Client form receives only a delivery-enabled boolean. No PII in application error logs or browser storage. Logs contain a fixed event name only.
- CSP uses a fresh per-response nonce and strict-dynamic for scripts. Script `unsafe-inline` is absent. `unsafe-eval` is development-only. `style-src-attr 'unsafe-inline'` is a documented compatibility exception for framework-generated Next/Image inline sizing/layout attributes; it does not permit inline scripts. Nonce-based style elements remain required.
- Content pages are dynamically rendered because static HTML cannot reuse a fresh nonce safely. Edge/CDN caching must not reuse nonce-bearing HTML.
- HSTS, nosniff, restrictive permissions, referrer policy, same-origin opener isolation and frame protection. The enquiry API returns JSON with no-store and a restrictive `default-src 'none'; frame-ancestors 'none'` CSP. No auth cookies or uploads exist.

## Limits and maintenance

This is not a claim of full OWASP ASVS or WCAG certification. See the release report for actual checks and outstanding tests. Upstream email/hosting behavior, production TLS, distributed quota enforcement and real deliverability require staging verification. Rotate any exposed key immediately and redeploy; never paste keys into source or chat.

Incident response: disable enquiry delivery by removing its Resend key from the affected deployment, preserve safe operational timestamps, assess scope, rotate credentials, repair and retest, then restore a known-good release. Do not log enquiry payloads while investigating. Confirm a retention and deletion schedule covering Resend, Upstash and the business mailbox before launch.

- The visit section allows Google Maps embeds through a host-specific frame-src for https://www.google.com. Script, connection and frame-ancestor restrictions are preserved. Map navigation opens with noopener/noreferrer and omits a fixed origin; this application does not request geolocation. The privacy notice describes the external map service.
