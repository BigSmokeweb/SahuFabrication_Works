# Deployment and operations

## Vercel preview

1. Import the existing `BigSmokeweb/SahuFabrication_Works` repository. Do not create another repository. Select Next.js, Node.js 24, `npm ci`, and `npm run build`.
2. Deploy a development branch as a Vercel Preview. The application sends `X-Robots-Tag: noindex, nofollow` outside Vercel Production and robots disallows indexing. Use Vercel deployment protection as well; noindex is not access control.
3. Set `SITE_URL` to the exact canonical origin for the environment, without a trailing slash. A current Vercel preview origin from `VERCEL_URL` is accepted automatically. Test preview and production values separately.
4. For email, configure `RESEND_API_KEY`, a domain-verified `ENQUIRY_FROM_EMAIL`, and the owner-approved `ENQUIRY_TO_EMAIL`.
5. Provision Upstash Redis and set its HTTPS REST URL/token. Generate a high-entropy `RATE_LIMIT_SALT` and store it as a secret. Set expirations/retention and access controls in the provider. Do not commit actual values.
6. Confirm the call/WhatsApp number and full address in `src/lib/business.ts`. Confirm the establishment year before adding it to business copy. Add verified LocalBusiness JSON-LD and canonical metadata after the domain/location are approved.
7. Approve the privacy contact and a retention/deletion schedule. Replace illustrative concepts with approved real photographs as available.
8. Run the checks in TESTING.md, submit one controlled enquiry to the approved recipient, confirm actual inbox receipt, then test failure handling and the shared limiter across separate instances. No email was sent in local tests.

## Production approval

Only promote after owner approval, passing CI, zero known unresolved high/critical audit findings, configured delivery and verified business content. Connect the approved domain; verify DNS, valid TLS, HTTP-to-HTTPS redirects, canonical URLs, no mixed content, production CSP, indexing and all contact actions. A local build does not verify these items.

## Monitoring

Use Vercel's restricted runtime logs for fixed `enquiry_delivery_failed` / `enquiry_service_unavailable` events. Configure an alert for these events and high 5xx/429 rates after owner account access is provided. Check Resend accepted/delivered/bounced events in its restricted dashboard. Never include raw customer data in telemetry. Configure uptime monitoring for `/` and delivery-service status using owner-approved services; no monitoring account was created.

## Rollback and recovery

Record the current production deployment ID before promotion. In Vercel, promote the previous known-good deployment if error rates or delivery failures increase. Restore its matching environment configuration separately if it changed. Re-run a controlled delivery check. Enquiry data lives in the business email system; the owner must configure mailbox backup and retention. The application has no persistent customer database.

## GitHub

Initialize the empty repository with a minimal main-branch baseline only when publishing source is authorized. Commit tested implementation on `feature/sahu-website`, push that branch and open a PR into main. Require the Website checks and CodeQL workflows before merge. Enable dependency review/secret scanning/private security reporting and branch rules where supported; those repository settings are not configured by these files. Workflows use read-only permissions except CodeQL security-event upload, and official pinned action revisions. No `pull_request_target` is used.
