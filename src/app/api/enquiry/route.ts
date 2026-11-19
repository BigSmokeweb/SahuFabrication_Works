import { createHmac } from "node:crypto";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Resend } from "resend";
import { createEnquiryHandler, formatEnquiry } from "@/lib/enquiry-handler";
export const runtime = "nodejs";
const needed = [
  "RESEND_API_KEY",
  "ENQUIRY_TO_EMAIL",
  "ENQUIRY_FROM_EMAIL",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "RATE_LIMIT_SALT",
  "SITE_URL",
];
// Compare against the normalised origin so a trailing slash or path in
// SITE_URL cannot silently break (or loosen) the origin check.
function siteOrigin() {
  try {
    return new URL(process.env.SITE_URL || "").origin;
  } catch {
    return null;
  }
}
export const POST = createEnquiryHandler({
  configured: () =>
    needed.every((k) => !!process.env[k]) && process.env.VERCEL === "1",
  allowedOrigin: (origin) =>
    !!origin &&
    (origin === siteOrigin() ||
      origin === `https://${process.env.VERCEL_URL}` ||
      (process.env.NODE_ENV === "development" &&
        origin === "http://localhost:3000")),
  async limit(request) {
    // Vercel overwrites x-vercel-forwarded-for; do not trust arbitrary forwarded headers on other hosts.
    const ip = request.headers
      .get("x-vercel-forwarded-for")
      ?.split(",")[0]
      .trim();
    if (!ip) return false;
    const redis = Redis.fromEnv();
    const identity = createHmac("sha256", process.env.RATE_LIMIT_SALT!)
      .update(ip)
      .digest("hex");
    const perIp = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "sahu:ip",
      analytics: false,
      timeout: 3000,
    });
    const global = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(40, "1 h"),
      prefix: "sahu:global",
      analytics: false,
      timeout: 3000,
    });
    const local = await perIp.limit(identity);
    if (!local.success || local.reason === "timeout") return false;
    const total = await global.limit("enquiries");
    return total.success && total.reason !== "timeout";
  },
  async send(data, key) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send(
      {
        from: process.env.ENQUIRY_FROM_EMAIL!,
        to: [process.env.ENQUIRY_TO_EMAIL!],
        subject: "New Sahu Fabrication Works enquiry",
        text: formatEnquiry(data),
        ...(data.email ? { replyTo: data.email } : {}),
      },
      { idempotencyKey: key },
    );
    return !result.error && !!result.data?.id;
  },
});
