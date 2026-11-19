import fs from "node:fs/promises";
import sharp from "sharp";
const destination = new URL("../public/images/", import.meta.url);
await fs.mkdir(destination, { recursive: true });
const defs = `<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#e9ecef"/><stop offset="1" stop-color="#ced4da"/></linearGradient><linearGradient id="metal"><stop stop-color="#343a40"/><stop offset=".45" stop-color="#6c757d"/><stop offset="1" stop-color="#343a40"/></linearGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#ced4da"/><stop offset=".5" stop-color="#dee2e6"/><stop offset="1" stop-color="#adb5bd"/></linearGradient><linearGradient id="aluminium"><stop stop-color="#e9ecef"/><stop offset=".5" stop-color="#adb5bd"/><stop offset="1" stop-color="#e9ecef"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="8"/></filter><pattern id="slats" width="20" height="12" patternUnits="userSpaceOnUse"><rect width="20" height="12" fill="#6c757d"/><path d="M0 0h20M0 10h20" stroke="#343a40" stroke-width="2"/><path d="M0 3h20" stroke="#6c757d" stroke-width="1"/></pattern></defs>`;
const shutter = `<rect x="100" y="75" width="440" height="290" fill="#adb5bd"/><rect x="120" y="90" width="400" height="275" fill="url(#slats)"/><rect x="104" y="66" width="432" height="34" rx="3" fill="url(#metal)"/><rect x="104" y="100" width="17" height="268" fill="url(#metal)"/><rect x="519" y="100" width="17" height="268" fill="url(#metal)"/><rect x="118" y="353" width="404" height="13" fill="#343a40"/><rect x="308" y="333" width="24" height="5" rx="2" fill="#ced4da"/>`;
const gate = `<path d="M55 365V107l28-12v270m474 0V107l28-12v270" fill="#dee2e6" stroke="#adb5bd" stroke-width="2"/><rect x="83" y="124" width="474" height="229" fill="url(#metal)" stroke="#212529" stroke-width="7"/>${Array.from({ length: 15 }, (_, i) => `<path d="M${96 + i * 31} 128v221" stroke="#6c757d" stroke-width="4"/>`).join("")}<path d="M86 200h468M86 275h468" stroke="#343a40" stroke-width="8"/><rect x="305" y="208" width="8" height="35" fill="#ced4da"/><path d="M70 368h510" stroke="#6c757d" stroke-width="4"/>`;
const window = `<rect x="103" y="65" width="434" height="306" fill="#adb5bd"/><rect x="116" y="78" width="408" height="280" fill="url(#glass)" stroke="url(#aluminium)" stroke-width="13"/><path d="M320 82v272M126 346h388" stroke="#6c757d" stroke-width="9"/><path d="M326 83v270" stroke="#f8f9fa" stroke-width="4"/><path d="M142 310 280 100M374 315 492 129" stroke="#f8f9fa" stroke-width="30" opacity=".19"/><rect x="301" y="207" width="7" height="35" fill="#495057"/><rect x="333" y="207" width="7" height="35" fill="#495057"/>`;
const shed = `<path d="M75 172 380 90l191 83-306 91Z" fill="url(#metal)" stroke="#495057" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${90 + i * 24} ${169 - i * 6.3}l188 83" stroke="#6c757d" stroke-width="2"/>`).join("")}<path d="M85 178v166m180-80v123m292-206v153m-180-113V99" stroke="#495057" stroke-width="10"/><path d="m85 344 180 43 292-53" stroke="#adb5bd" stroke-width="2"/>`;
const fabrication = `<path d="m115 317 220 58 203-109-220-58Z" fill="#6c757d"/><path d="m115 296 220 58 203-109-220-58Z" fill="url(#metal)" stroke="#6c757d" stroke-width="2"/><path d="M134 301v69m201-18v54m181-149v70" stroke="#495057" stroke-width="12"/><path d="m220 230 0-130 144-40v134m-144-37 144-40m-144 17 144-40" fill="none" stroke="#6c757d" stroke-width="11"/><path d="m220 100 71 30 144-40-71-30m-73 70v133m144-173v133" fill="none" stroke="#6c757d" stroke-width="10"/><path d="m145 280 165-86 172 46" fill="none" stroke="#ced4da" stroke-width="7"/>`;
const pvc = `<path d="m115 294 254-145 80 45-254 145Z" fill="#f8f9fa"/><path d="m115 294 80 45v22l-80-45Z" fill="#ced4da"/><path d="m195 339 254-145v22L195 361Z" fill="#e9ecef"/><path d="m200 236 175-100 46 27-174 101Z" fill="#f8f9fa"/><path d="m200 236 47 28v-60l-47-28Z" fill="#ced4da"/><path d="m200 176 175-100v60L200 236Z" fill="#f8f9fa"/><path d="m200 176 175-100 6 4-175 100Z" fill="#f8f9fa"/>`;
for (const [name, content] of Object.entries({
  shutter,
  gate,
  window,
  shed,
  fabrication,
  pvc,
})) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440">${defs}<rect width="640" height="440" fill="url(#bg)"/><path d="M0 355h640v85H0Z" fill="#ced4da" opacity=".45"/><ellipse cx="325" cy="375" rx="240" ry="19" fill="#6c757d" opacity=".25" filter="url(#shadow)"/>${content}</svg>`;
  await fs.writeFile(new URL(name + ".svg", destination), svg);
}
if (process.argv[2])
  await sharp(process.argv[2])
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(
      new URL("hero.webp", destination).pathname.replace(/^\/([A-Z]:)/, "$1"),
    );
