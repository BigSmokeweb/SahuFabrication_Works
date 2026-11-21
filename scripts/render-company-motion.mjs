import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
const root = process.cwd();
const frames = path.join(root, "reports/motion-build/frames");
await fs.mkdir(frames, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
try {
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  await page.goto(
    pathToFileURL(path.join(root, "docs/motion/index.html")).href + "?clean=1",
  );
  await page.waitForFunction(() => window.motionReady);
  await page.evaluate(() =>
    Promise.all(Array.from(document.images, (image) => image.decode())),
  );
  for (let frame = 0; frame < 300; frame++) {
    await page.evaluate((time) => window.OPENER.seek(time), frame / 12);
    await page.screenshot({
      path: path.join(frames, `${String(frame).padStart(4, "0")}.png`),
    });
    if (frame % 60 === 0)
      process.stdout.write(`Rendered ${frame}/300 frames\n`);
  }
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      "12",
      "-i",
      path.join(frames, "%04d.png"),
      "-filter_complex",
      "fps=10,scale=720:406:flags=lanczos,split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle",
      "-loop",
      "0",
      path.join(root, "docs/motion/sahu-built-in-motion.gif"),
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) throw new Error(result.stderr || "FFmpeg failed");
  process.stdout.write("Created 25-second README animation\n");
} finally {
  await browser.close();
}
