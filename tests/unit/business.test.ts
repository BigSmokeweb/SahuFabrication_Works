import { expect, it } from "vitest";
import { business, phoneLink, whatsappLink } from "../../src/lib/business";
import { categories, services } from "../../src/lib/services";
it("keeps unverified business details unpublished", () => {
  expect(business.verifiedPhone).toBeNull();
  expect(business.verifiedAddress).toBeNull();
  expect(business.established).toBeNull();
});
it("formats contact links", () => {
  expect(phoneLink("98690 24674")).toBe("tel:+919869024674");
  expect(whatsappLink("9869024674")).toBe("https://wa.me/919869024674");
});
it("includes all 22 supplied services with unique URLs", () => {
  expect(services).toHaveLength(22);
  expect(new Set(services.map((s) => s.slug)).size).toBe(22);
  expect(categories).toHaveLength(6);
});
