import fs from "node:fs/promises";
import sharp from "sharp";
const svg = await fs.readFile(
  new URL("../public/images/sahu-awning.svg", import.meta.url),
);
const png = await sharp(svg)
  .resize(32, 32, { fit: "contain", background: "#ffffff" })
  .png()
  .toBuffer();
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
