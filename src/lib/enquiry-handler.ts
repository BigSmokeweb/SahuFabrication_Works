import { enquirySchema, formatEnquiry, type Enquiry } from "./enquiry-schema";
type Dependencies = {
  configured: () => boolean;
  allowedOrigin: (origin: string) => boolean;
  limit: (request: Request) => Promise<boolean>;
  send: (data: Enquiry, key: string) => Promise<boolean>;
};
const response = (status: number, message: string) =>
  Response.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
        ...(status === 429 ? { "Retry-After": "600" } : {}),
      },
    },
  );
export function createEnquiryHandler(deps: Dependencies) {
  return async (request: Request) => {
    if (!deps.allowedOrigin(request.headers.get("origin") || ""))
      return response(
        403,
        "This request could not be accepted. Please reload the contact page.",
      );
    if (
      request.headers.get("content-type")?.split(";")[0].trim() !==
      "application/json"
    )
      return response(415, "Use the enquiry form to submit your request.");
    const maximum = 12_000;
    if (Number(request.headers.get("content-length") || 0) > maximum)
      return response(413, "Your enquiry is too long. Please shorten it.");
    let raw: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return response(400, "Please complete the enquiry form.");
      let size = 0;
      const chunks: Uint8Array[] = [];
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maximum) {
          await reader.cancel();
          return response(413, "Your enquiry is too long. Please shorten it.");
        }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      raw = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    } catch {
      return response(400, "Please check the enquiry and try again.");
    }
    // A filled honeypot fails schema validation (400) rather than being
    // silently accepted: a browser autofill must never make a real
    // customer's enquiry disappear while telling them it was sent.
    const data = enquirySchema.safeParse(raw);
    if (!data.success)
      return response(
        400,
        "Please check your name, phone, service, message and consent.",
      );
    const key = request.headers.get("idempotency-key");
    if (
      !key ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        key,
      )
    )
      return response(400, "Please reload the form and try again.");
    if (!deps.configured())
      return response(
        503,
        "Online enquiry delivery is not available yet. Your enquiry has not been sent. Use “Copy Enquiry” to keep a copy.",
      );
    try {
      if (!(await deps.limit(request)))
        return response(
          429,
          "Too many enquiries. Please wait 10 minutes before trying again.",
        );
      if (!(await deps.send(data.data, key))) {
        console.error(JSON.stringify({ event: "enquiry_delivery_failed" }));
        return response(
          502,
          "We could not deliver your enquiry. It has not been confirmed. Please try again or copy it for later.",
        );
      }
      return response(
        200,
        "Your enquiry has been accepted for email delivery. Thank you.",
      );
    } catch {
      console.error(JSON.stringify({ event: "enquiry_service_unavailable" }));
      return response(
        503,
        "Enquiry delivery is temporarily unavailable. Your enquiry has not been confirmed. Please copy it and try again later.",
      );
    }
  };
}
export { formatEnquiry };
