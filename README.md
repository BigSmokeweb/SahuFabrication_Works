# Sahu Fabrication Works

Responsive Next.js website for Sahu Fabrication Works in Thane West, with red, white and warm orange branding from the company's business card.

## Built in motion

![Sahu Fabrication Works — assembling shutters, sliding gates, aluminium windows and the red-and-white awning](docs/motion/sahu-built-in-motion.gif)

A silent 25-second company motion edit. Its editable HTML, rendering script and license notices are retained in the owner's local project folder.

Created with [Bang Motion](https://github.com/bangtutorial/bang-motion), using the company logo and existing product visuals. Product imagery is AI-generated and does not represent completed Sahu projects. The animation uses Barlow Condensed under the SIL Open Font License.

## Development

Use Node.js 24 LTS and npm. This workspace was also tested with Node.js 26.13.0.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview:

```sh
npm run build
npm run start
```

## Pages and features

- Home with an accessible manual slider, company introduction, service categories and enquiry CTAs.
- About, products/services, 27 distinct category/product detail URLs, gallery with filters and keyboard-accessible image dialog, contact, privacy and 404.
- Responsive navigation, skip link, focus indicators, reduced-motion support and original product visuals.
- React Hook Form and Zod enquiry validation; matching server validation, request-size limits, same-origin checks, honeypot, shared Upstash rate limits, Resend plain-text email and idempotency keys.
- Copy-enquiry fallback; no draft or customer data stored in browser storage.
- Nonce-based script CSP, security headers, preview noindex, sitemap and robots routes.

## Technology

Next.js 16.4.6, React 19.3.1, strict TypeScript, Tailwind CSS, Lucide, React Hook Form, Zod, Resend and Upstash. CSS handles transitions and accessibility preferences. Pointer Events and a small interruptible spring provide hero-swipe feedback without an additional animation runtime. Content pages use server rendering so each response can have a fresh CSP nonce. No database, accounts, analytics, uploads or admin system.

## Business configuration

Edit `src/lib/business.ts`. The owner confirmed the workshop is beside New Lucky Auto Parts, near Riddhi Siddhi Apartment, Louis Wadi, Thane West, Thane, Maharashtra 400604, India. The visit section displays Sahu Fabrication Works and uses the neighbouring New Lucky Auto Parts listing for the embedded map and directions. Sahu does not yet have its own map listing; the website identifies the neighbouring shop as a landmark. Directions omit a fixed origin so visitors can choose their own starting point in Google Maps. Phone numbers and the 1970 establishment date remain **unverified** and excluded. Call and WhatsApp links remain disabled.

All 22 supplied services are represented across six categories. Stainless steel grades, certifications, statistics, reviews and guarantees are intentionally absent until verified.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
npm audit
npm audit --omit=dev
```

CI runs lint, TypeScript, unit tests, dependency audits, the production build and browser tests. Separate workflows scan for secrets and run CodeQL. See [SECURITY.md](SECURITY.md) and [DEPLOYMENT.md](DEPLOYMENT.md) for operational requirements.

## Repository and release

Only `main` is retained. Commits are authored by Milind Sahu. Scheduled Dependabot version-update PRs are paused at the owner's request. Publishing source does not deploy the website. Verified phone details, enquiry delivery setup and deployment verification remain pending.
