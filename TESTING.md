# Verification

## Commands

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit`, and `npm audit --omit=dev`. Install official browser runtimes with `npx playwright install chromium firefox webkit`, then `npm run test:e2e`. CI installs Linux browser system dependencies with `--with-deps`.

The browser suite must run against a **production build**. Set `SITE_URL=http://localhost:3000` for the server when testing locally; CI does this automatically. Do not configure real email credentials for automated tests. The form test expects a safe 503 when delivery is unconfigured.

## Coverage

Unit/integration tests cover server validation, names/phone/email formats, service allowlist, consent, honeypot, origin checks, content type, streaming body limits, malformed JSON, missing idempotency keys, fail-closed configuration/limiting, email failures, provider acceptance and non-disclosing errors. Delivery and rate-limit dependencies are mocked. Configuration tests ensure unverified data is not published and all 22 supplied services have URLs.

Playwright checks main and service routes, image loads, slider controls, interruptible pointer swipes in both directions, gallery filters/dialog/keyboard focus restoration, form errors, accurate unavailable-delivery feedback, preserved drafts, mobile navigation, 320/375/390/768/1024/1440/1920 widths, axe WCAG AA checks, security headers, unsupported API methods, cross-origin rejection and 404 handling across Chromium, Firefox and WebKit. Chromium additionally exercises native touch-emulation swipes and confirms vertical touch scrolling still works.

## Manual release verification

- Navigate every header/footer/CTA and related-service link. Review service-specific content and gallery disclosure.
- Keyboard through the mobile menu, form and lightbox; test Escape, visible focus, 200% zoom, long text and reduced motion. Run a screen reader on at least one desktop and mobile platform.
- Verify actual trusted proxy headers, distributed limiter behavior, real email delivery, Resend outage, timeouts, retry idempotency and retained form data in an owner-controlled staging environment.
- Confirm call, WhatsApp and precise directions only after the owner supplies verified contact data.
- Use Lighthouse on representative staging pages and devices; record each score and environment. Scores are lab results, not field Core Web Vitals guarantees.
- Run OWASP ZAP baseline only against authorized staging or localhost. Example: `docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://YOUR-AUTHORIZED-STAGING-URL`. Do not scan the reference site. Docker must be available. Review findings; a scan is not an ASVS certification.
- Run Gitleaks and CodeQL in CI and review artifacts. Confirm zero unresolved known high/critical findings before release. Repeat testing after changes that affect behavior.
