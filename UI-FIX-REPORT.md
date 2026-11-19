# UI polish and enquiry hardening — 19 November 2026

Implemented the supplied fix brief in the existing repository using the Apple Design skill. The brief's prior audit statements were treated as background; the results below come from checks run for this change.

## What changed

- Platform system typography, optical font sizing and tighter brand tracking.
- A translucent, blurred gradient header with solid reduced-transparency and higher-contrast fallbacks.
- Rounded buttons, service cards, gallery items, product images and form controls, with immediate press feedback.
- Restrained entrance movement; text and buttons stay fully opaque throughout to preserve contrast. Reduced-motion preferences disable entrance movement and spring settling.
- A hero background that follows horizontal pointer travel, resists at its bounds and returns using an interruptible, critically damped spring. Flick projection uses recent pointer velocity. Users can reverse direction immediately; vertical touch gestures remain page scrolling.
- A content-sized hero prevents longer mobile copy and CTAs from colliding with carousel controls.
- Mobile navigation can be dismissed with Escape, declares its controlled navigation region, and no longer shows a dropdown chevron on a normal service link.
- SITE_URL is compared using its normalized origin. Trailing slashes and paths no longer prevent valid same-origin enquiries.
- Idempotency keys must be hexadecimal UUID v4 values. Enquiry JSON responses carry a restrictive CSP. Populated honeypots remain visible validation failures, never false successes.
- Added same-origin opener isolation, cross-domain policy restrictions and the requested permissions restrictions.

## Actual checks

All commands below ran successfully against this implementation:

```text
npm ci
added 517 packages, and audited 524 packages
found 0 vulnerabilities

npx prettier --write src tests next.config.ts
Completed

npm run lint
Passed with no lint errors or warnings

npm run typecheck
Passed

npm test
Test Files  2 passed (2)
     Tests  27 passed (27)

npm audit --audit-level=high
found 0 vulnerabilities

npm audit --omit=dev --audit-level=high
found 0 vulnerabilities

npm run build
Compiled successfully
Finished TypeScript
Generated static metadata pages successfully

npm run test:e2e
21 passed (33.3s)
```

The final combined Playwright run passed seven checks per browser in Chromium, Firefox and WebKit. It covered every main/service route and image, slider/gallery controls, keyboard interaction, form validation, explicit unavailable delivery, response headers, cross-origin rejection, and 404 behavior. No horizontal overflow was found at 320, 375, 390, 768, 1024, 1440 or 1920px. Axe found no violations for the tested WCAG AA tags on the representative desktop pages and mobile homepage.

Pointer swipes in both directions and re-grabbing during spring motion were tested in all three engines. Chromium additionally used native touch emulation to verify both a horizontal swipe and vertical page scrolling. The form test was repeated against a local server with `SITE_URL=http://localhost:3000/`; it passed and correctly reported that unconfigured delivery had not sent the enquiry. No real email was sent.

Read the actual homepage response headers:

```text
Cross-Origin-Opener-Policy: same-origin
X-Permitted-Cross-Domain-Policies: none
```

Desktop homepage, service-card and contact-form layouts and the mobile homepage/navigation were visually inspected. Screenshots are saved locally under `reports/ui-polish/` and excluded from the public repository.

## Remaining limits

ESLint 9.39.5 still carries npm's unsupported-version notice; the lint check passes and the performed dependency audits report no known vulnerabilities. A compatible tooling upgrade remains maintenance work.

OWASP ZAP and local CodeQL analysis were not run for this task. GitHub CI/CodeQL results are separate from the local checks above. Lighthouse was not rerun for this change, so earlier Lighthouse numbers should not be treated as measurements of this revision. Automated accessibility checks do not constitute full WCAG certification.

Verified contact information, approved project photography, delivery-provider configuration, a controlled real inbox test, production/staging verification and privacy review remain outstanding. No production deployment or branch-protection change is part of this update. The owner's original fix-instruction file is preserved locally and is not included in the source commit.
