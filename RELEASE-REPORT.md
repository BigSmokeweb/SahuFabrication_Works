# Release report — 19 November 2026

For the subsequent UI polish and enquiry-security fixes, see [UI-FIX-REPORT.md](UI-FIX-REPORT.md). The results below describe the initial implementation; the follow-up report records the later revision's checks.

The current visual theme and its verification are documented in [PALETTE.md](PALETTE.md), following the owner's grayscale palette update.

**Assessment: NOT READY for public production.** The website implementation is ready for local review. Business verification, delivery setup, staging verification and publication remain incomplete. The owner deferred business-contact confirmation.

## Completed implementation

Home, About Us, Products & Services, 27 unique category/product detail URLs covering all 22 supplied services, Gallery, Contact, Privacy Policy and a custom 404. Shared navigation/footer, manual hero slider, gallery filters and keyboard-accessible image dialog work. The contact flow has validation, loading/error states, shared-limit and email adapters, and an explicit copy-enquiry fallback.

The reference site was inspected in a browser at desktop and mobile dimensions, including its homepage and About page. Its gradient branding strip, prominent slider, introductory split layout, service presentation and enquiry/footer progression informed this implementation. This is an adaptation to Sahu's services, not a pixel-identical copy. Original imagery replaces protected reference-site photographs. Final desktop/mobile screenshots are in `reports/`.

## Actual verification results

| Check | Result |
| --- | --- |
| Locked dependency installation | Passed `npm ci --ignore-scripts`; normal npm installation also completed |
| ESLint | Passed, no errors or warnings |
| TypeScript | Passed strict `tsc --noEmit` |
| Vitest | 25 tests passed across 2 files |
| Production build | Passed Next.js 16.4.6 build |
| Playwright | 18 of 18 checks passed in final combined run |
| Chromium / Firefox / WebKit | 6 checks passed per browser |
| Route and image checks | Main pages and all category/product routes passed |
| Responsive layout | Passed overflow checks at 320, 375, 390, 768, 1024, 1440 and 1920px |
| Accessibility | No axe violations for tested WCAG AA tags on home/services/contact/gallery; mobile homepage also tested in each browser |
| Security behavior | Origin/content-type/body-size/validation/consent/idempotency/error/limiter behavior tested; provider/limiter dependencies mocked in integration tests |
| Dependency audit, complete tree | Zero reported vulnerabilities |
| Production dependency audit | Zero reported vulnerabilities |
| Secret scanning / CodeQL | Workflows prepared; not executed remotely |
| OWASP ZAP | Not run: installed Docker client has no running Docker daemon |

The initial sandbox build could not launch compiler subprocesses; the permitted normal build then passed. Initial browser checks found a logo accessible-name mismatch, breadcrumb contrast and a localhost WebKit HTTPS-upgrade issue; these were fixed. Mobile Lighthouse additionally identified small slider touch targets and a missing favicon; these were fixed. The final browser run passed after these changes. An automatic approval review initially blocked a manual synthetic form submission; checks established that email credentials and the Vercel runtime were absent, and approved automated localhost tests verified the fail-closed response. No email was sent.

## Lighthouse

Local mobile Lighthouse, production build, simulated mobile throttling:

| Category | Score |
| --- | --- |
| Performance | 98 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 66 |

SEO is intentionally reduced because local/staging pages send noindex directives and robots disallows crawling. Do not remove this protection merely to improve a preview score. Verify production indexing, the approved canonical domain and structured business data after launch configuration. These are single-run lab scores, not measured field Core Web Vitals or a guarantee.

Full Lighthouse reports: `reports/lighthouse-mobile.report.html` and `.json` in the local workspace. Reports, screenshots and unverified business source notes are excluded from the public source repository. Accessibility results are automated checks, not a complete WCAG conformance assessment; screen-reader and broader device testing remain outstanding.

## Security findings and limits

No known dependency vulnerabilities were reported by the performed npm audits. No unresolved high/critical issue was found by the performed checks; this does not imply that unperformed scanners or production tests would find none.

- Enquiry delivery fails closed without all required configuration and the trusted Vercel ingress environment. Submitted values remain in the form on failure. No customer database or uploads are present.
- Three-per-IP/ten-minute and global 40/hour quotas are implemented using shared Redis. Adapter failures block delivery. Real multi-instance enforcement and actual inbox delivery require staging testing.
- CSP has per-request script nonces; no inline script allowance. A documented `style-src-attr 'unsafe-inline'` exception supports Next/Image layout attributes. HTTPS-upgrade is omitted only for loopback previews and development. Security headers and production script policy were verified locally.
- Content pages render per request to avoid reusing nonce-bearing HTML. Do not add shared HTML caching without redesigning this policy.
- Honeypot and quotas are basic spam controls. Configure monitoring and consider a challenge provider if real abuse warrants it. A global quota can temporarily affect legitimate enquiries under attack.
- ESLint 9.39.5 is retained for the installed Next.js lint-plugin peer compatibility. npm marks that tooling line unsupported; review compatible upstream tooling updates before long-term maintenance. It is a development-only tool and the performed audit reports no associated vulnerability.
- Production TLS, redirects, environment access, rate limits, mailbox retention and provider account settings have not been verified.

## GitHub and deployment

Repository: https://github.com/BigSmokeweb/SahuFabrication_Works

The exact existing repository was cloned and confirmed empty; its remote points to the supplied URL. Local work is on `feature/sahu-website`. No existing source or history was overwritten.

- Source publication and a fresh initial commit under Milind Sahu were requested by the owner on 19 November 2026. Subsequent repository cleanup retains only `main` and pauses scheduled Dependabot version-update PRs.
- Final commit SHA: see the repository branch head and publication confirmation in the chat. The previous draft PR is superseded by the requested fresh publication.
- CI status at local validation: no remote run yet; CI, CodeQL and Dependabot files are prepared. Consult the checks on the published commit for current results.
- Branch protections/security settings: not changed.
- Vercel preview URL: none; Vercel not configured.
- Production URL: none; no production release promoted.
- Local review URL: http://localhost:3000/

## Deferred owner decisions and release gates

1. Confirm primary call/WhatsApp number from the supplied notes, full workshop address and whether the 1970 establishment year is correct. Unconfirmed values are not rendered; internal source notes are kept outside the client imports.
2. Verify service/material applicability, especially SS 202/304/316 claims, before adding specifications.
3. Supply approved completed-project photos if desired. Current images are explicitly labelled illustrations.
4. Configure an approved enquiry recipient, verified Resend sender domain/key, Upstash credentials and rate-limit salt using hosting secrets. Complete a controlled actual-email delivery test and failure/abuse checks.
5. Confirm the privacy contact and retention/deletion schedule and review applicable obligations before accepting real enquiries.
6. Publish the authorized source and establish the empty repository's main baseline and PR workflow; execute and review CI, secret scanning and CodeQL. Enable supported repository protections.
7. Deploy protected staging, perform ZAP and operational checks, approve the production domain, add canonical and verified LocalBusiness metadata, then explicitly approve production promotion.

See DEPLOYMENT.md for release/rollback and monitoring instructions. Do not describe the current local website as a live customer enquiry service.
