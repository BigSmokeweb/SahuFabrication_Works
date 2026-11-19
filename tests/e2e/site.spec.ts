import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { categories, services } from "../../src/lib/services";
test("main pages and all service detail routes load", async ({ page }) => {
  test.setTimeout(90000);
  for (const path of [
    "/",
    "/about",
    "/services",
    "/gallery",
    "/contact",
    "/privacy",
    ...new Set([
      ...categories.map((c) => "/services/" + c.slug),
      ...services.map((s) => "/services/" + s.slug),
    ]),
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    for (const image of await page.locator("img:visible").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((i) => (i as HTMLImageElement).naturalWidth),
        path,
      ).toBeGreaterThan(0);
    }
  }
});
test("slider and gallery filter/lightbox work with keyboard", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Next service" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Make an entrance",
  );
  await page.goto("/gallery");
  await page
    .getByRole("button", { name: "Gates & Safety Doors", exact: true })
    .first()
    .click();
  await expect(page.locator(".gallery-item")).toHaveCount(1);
  await page.locator(".gallery-item").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".gallery-item")).toBeFocused();
});
test("form validation and unavailable delivery are explicit", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(
    page.getByText("Enter your name (at least 2 characters)."),
  ).toBeVisible();
  await page.getByLabel("Your name *").fill("Asha Patil");
  await page.getByLabel("Phone number *").fill("9876543210");
  await page.getByLabel("Required service *").selectOption("Rolling Shutters");
  await page
    .getByLabel("About your requirement *")
    .fill("Need a shutter for my shop entrance.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send Enquiry", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry has not been sent",
  );
  await expect(page.getByLabel("Your name *")).toHaveValue("Asha Patil");
});
test("hero swipes follow the pointer, reverse, and preserve vertical touch scrolling", async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const hero = page.getByRole("region", { name: "Featured services" });
  const bounds = await hero.boundingBox();
  expect(bounds).not.toBeNull();
  const y = bounds!.y + 200;
  await page.mouse.move(290, y);
  await page.mouse.down();
  await page.mouse.move(120, y, { steps: 8 });
  expect(
    await page
      .locator(".hero-stage")
      .evaluate((el) =>
        parseFloat((el as HTMLElement).style.getPropertyValue("--hero-drag")),
      ),
  ).toBeLessThan(0);
  await page.mouse.up();
  await expect(page.locator("h1")).toContainText("Make an entrance");
  // Re-grab during the spring's return; there is no input lockout.
  await page.mouse.move(110, y);
  await page.mouse.down();
  await page.mouse.move(290, y, { steps: 8 });
  await page.mouse.up();
  await expect(page.locator("h1")).toContainText("Strength in every detail");
  if (browserName === "chromium") {
    const touch = await page.context().newCDPSession(page);
    await touch.send("Emulation.setTouchEmulationEnabled", { enabled: true });
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 290, y: 300 }],
    });
    for (let i = 1; i <= 8; i++)
      await touch.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 290 - 20 * i, y: 300 }],
      });
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect(page.locator("h1")).toContainText("Make an entrance");
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: 370, y: 600 }],
    });
    for (let i = 1; i <= 10; i++)
      await touch.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 370, y: 600 - 25 * i }],
      });
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(20);
    await expect(page.locator("h1")).toContainText("Make an entrance");
    await touch.detach();
  }
});
test("responsive widths have no horizontal overflow and menu works", async ({
  page,
}) => {
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      String(width),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Contact Us", exact: true })
    .click();
  await expect(page).toHaveURL(/contact/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
});
test("representative pages pass axe WCAG AA checks", async ({ page }) => {
  for (const path of ["/", "/services", "/contact", "/gallery"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const mobile = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(mobile.violations).toEqual([]);
});
test("production headers and endpoint integrity", async ({ request }) => {
  const page = await request.get("/");
  const h = page.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(
    h["content-security-policy"]
      .split(";")
      .find((p) => p.includes("script-src")),
  ).not.toContain("unsafe-inline");
  expect(h["content-security-policy"]).not.toContain("unsafe-eval");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["cross-origin-opener-policy"]).toBe("same-origin");
  expect(h["x-permitted-cross-domain-policies"]).toBe("none");
  expect(h["x-robots-tag"]).toContain("noindex");
  expect((await request.get("/api/enquiry")).status()).toBe(405);
  const cross = await request.post("/api/enquiry", {
    headers: { Origin: "https://evil.example" },
    data: { name: "test" },
  });
  expect(cross.status()).toBe(403);
  expect(cross.headers()["content-security-policy"]).toBe(
    "default-src 'none'; frame-ancestors 'none'",
  );
  expect((await request.get("/missing-page")).status()).toBe(404);
});
