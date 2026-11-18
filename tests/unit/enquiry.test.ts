import { describe, it, expect, vi } from "vitest";
import { enquirySchema } from "../../src/lib/enquiry-schema";
import { createEnquiryHandler } from "../../src/lib/enquiry-handler";
const valid = {
  name: "Asha Patil",
  phone: "9876543210",
  email: "",
  service: "Rolling Shutters",
  message: "A new shutter for my shop opening.",
  consent: true,
  website: "",
};
const headers = {
  "Content-Type": "application/json",
  Origin: "https://sahu.example",
  "Idempotency-Key": "12345678-1234-4123-8123-123456789012",
};
const request = (body: unknown = valid, extra: Record<string, string> = {}) =>
  new Request("https://sahu.example/api/enquiry", {
    method: "POST",
    headers: { ...headers, ...extra },
    body: JSON.stringify(body),
  });
function setup() {
  const deps = {
    configured: () => true,
    allowedOrigin: (s: string) => s === "https://sahu.example",
    limit: vi.fn(async () => true),
    send: vi.fn(async () => true),
  };
  return { deps, handler: createEnquiryHandler(deps) };
}
describe("Enquiry validation", () => {
  it("accepts valid Indian mobile and multilingual names", () => {
    expect(
      enquirySchema.safeParse({
        ...valid,
        name: "आशा पाटील",
        phone: "+919876543210",
      }).success,
    ).toBe(true);
  });
  it.each([
    { name: "<script>alert(1)</script>" },
    { phone: "123" },
    { email: "a\r\nBcc:test@example.org" },
    { message: "x".repeat(2001) },
    { consent: false },
    { service: "Injected service" },
    { website: "spam" },
    { unexpected: "injected" },
  ])("rejects invalid values %j", (change) =>
    expect(enquirySchema.safeParse({ ...valid, ...change }).success).toBe(
      false,
    ),
  );
});
describe("Request integrity and delivery", () => {
  it("rejects a cross-origin request before email", async () => {
    const { handler, deps } = setup();
    expect(
      (await handler(request(valid, { Origin: "https://attacker.example" })))
        .status,
    ).toBe(403);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("rejects missing origin", async () => {
    const { handler } = setup();
    expect((await handler(request(valid, { Origin: "" }))).status).toBe(403);
  });
  it("rejects an unexpected content type", async () => {
    const { handler } = setup();
    expect(
      (await handler(request(valid, { "Content-Type": "text/plain" }))).status,
    ).toBe(415);
  });
  it("bounds actual body size even without content length", async () => {
    const { handler } = setup();
    expect(
      (await handler(request({ ...valid, message: "x".repeat(13000) }))).status,
    ).toBe(413);
  });
  it("bounds declared request size", async () => {
    const { handler } = setup();
    expect(
      (await handler(request(valid, { "Content-Length": "13000" }))).status,
    ).toBe(413);
  });
  it("rejects malformed JSON", async () => {
    const { handler } = setup();
    expect(
      (
        await handler(
          new Request("https://sahu.example/api/enquiry", {
            method: "POST",
            headers,
            body: "{",
          }),
        )
      ).status,
    ).toBe(400);
  });
  it("validates on server and never sends invalid data", async () => {
    const { handler, deps } = setup();
    expect((await handler(request({ ...valid, consent: false }))).status).toBe(
      400,
    );
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("requires a valid idempotency key", async () => {
    const { handler } = setup();
    expect(
      (await handler(request(valid, { "Idempotency-Key": "bad" }))).status,
    ).toBe(400);
  });
  it("fails closed without delivery configuration", async () => {
    const { deps } = setup();
    deps.configured = () => false;
    expect((await createEnquiryHandler(deps)(request())).status).toBe(503);
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("enforces rate limits before sending email", async () => {
    const { handler, deps } = setup();
    deps.limit.mockResolvedValue(false);
    const result = await handler(request());
    expect(result.status).toBe(429);
    expect(result.headers.get("Retry-After")).toBe("600");
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("fails closed if shared rate limiter is unavailable", async () => {
    const { handler, deps } = setup();
    deps.limit.mockRejectedValue(new Error("private internal detail"));
    const r = await handler(request());
    expect(r.status).toBe(503);
    expect(await r.text()).not.toContain("private internal detail");
    expect(deps.send).not.toHaveBeenCalled();
  });
  it("reports email failure accurately", async () => {
    const { handler, deps } = setup();
    deps.send.mockResolvedValue(false);
    expect((await handler(request())).status).toBe(502);
  });
  it("only confirms acceptance when provider accepts email", async () => {
    const { handler, deps } = setup();
    expect((await handler(request())).status).toBe(200);
    expect(deps.send).toHaveBeenCalledWith(valid, headers["Idempotency-Key"]);
  });
});
