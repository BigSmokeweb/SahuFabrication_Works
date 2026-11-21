import { expect, it } from "vitest";
import {
  business,
  directionsLink,
  mapEmbedLink,
  phoneLink,
  whatsappLink,
} from "../../src/lib/business";
import { categories, services } from "../../src/lib/services";
it("keeps the unconfirmed phone and establishment year unpublished", () => {
  expect(business.verifiedPhone).toBeNull();
  expect(business.established).toBeNull();
});
it("publishes the owner-confirmed address beside New Lucky Auto Parts", () => {
  expect(business.verifiedAddress).toBe(
    "Beside New Lucky Auto Parts, near Riddhi Siddhi Apartment, Louis Wadi, Thane West, Thane, Maharashtra 400604, India",
  );
});
it("uses the neighbouring shop for maps and lets visitors choose their origin", () => {
  const directions = new URL(directionsLink);
  const embed = new URL(mapEmbedLink);
  expect(directions.origin).toBe("https://www.google.com");
  expect(directions.pathname).toBe("/maps/dir/");
  expect(directions.searchParams.get("destination")).toBe(
    "NEW LUCKY AUTO PARTS, near Riddhi Siddhi Apartment, Louis Wadi, Thane West, Thane, Maharashtra 400604, India",
  );
  expect(directions.searchParams.has("origin")).toBe(false);
  expect(embed.searchParams.get("q")).toBe(
    directions.searchParams.get("destination"),
  );
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
