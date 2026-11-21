# Sahu Fabrication Works

Responsive Next.js website for a fabrication business in Thane West. Based on the layout, image slider, introduction, service presentation and enquiry/footer progression of the supplied House of Fabrication reference, with the red, white and warm orange branding from the owner's company card. A reconstructed fabric awning sits above the company name in the header and footer. Original copy and illustrations are used; no reference-site photographs or claims were reused. See [PALETTE.md](PALETTE.md) for the current brand colors and their roles.

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

Edit `src/lib/business.ts`. The owner confirmed the card address: Eastern Express Highway, near Riddhi Siddhi Building, Louise Wadi, Thane West 400604. The shared enquiry section now includes a second visit column with an embedded map and directions to nearby Riddhi Siddhi CHS. An exact workshop pin has not been supplied; the map identifies the nearby landmark. Directions omit a fixed origin so visitors can choose their own starting point in Google Maps. Phone numbers and the 1970 establishment date remain **unverified** and excluded. Call and WhatsApp links remain disabled.

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

See [TESTING.md](TESTING.md), [SECURITY.md](SECURITY.md), [DEPLOYMENT.md](DEPLOYMENT.md) and [RELEASE-REPORT.md](RELEASE-REPORT.md). `ASSETS.md` documents image provenance.

## Repository and release

The existing repository is https://github.com/BigSmokeweb/SahuFabrication_Works. It was empty when cloned. At the owner's request, the implementation history starts with a fresh initial commit under Milind Sahu, and only `main` is retained. Scheduled Dependabot version-update PRs are paused with an open-PR limit of zero. No production promotion is implied by publishing source or by a successful local build. Owner-approved contact data, delivery configuration, controlled real-email testing, and deployment verification remain release gates.
