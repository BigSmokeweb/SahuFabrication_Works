import fs from "node:fs/promises";
import sharp from "sharp";
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="10" fill="#212529"/><path d="M44 18H25v14h17v14H21" fill="none" stroke="#f8f9fa" stroke-width="7" stroke-linejoin="round"/></svg>';
const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14);
header.writeUInt32LE(22, 18);
await fs.writeFile(
  new URL("../public/favicon.ico", import.meta.url),
  Buffer.concat([header, png]),
);
