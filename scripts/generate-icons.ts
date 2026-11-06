import fs from "node:fs/promises";
import sharp from "sharp";

// Use the approved artwork; do not recreate its lettering with a fallback font.
const source = "public/branding/kyoto-trip-c.png";
const cream = "#FFFCF6";
await fs.mkdir("public/icons", { recursive: true });
for (const size of [16, 32, 48, 180, 192, 512]) {
  await sharp(source).resize(size, size).png({palette:true,colours:128,effort:10}).toFile(`public/icons/kyoto-trip-c-${size}.png`);
}
const png512 = await sharp(source).resize(512, 512).png({palette:true,colours:128,effort:10}).toBuffer();
// Keep legacy addresses valid with the same artwork.
await fs.writeFile("public/icons/icon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Kyoto Trip</title><image width="512" height="512" href="data:image/png;base64,${png512.toString("base64")}"/></svg>`);
for (const size of [180, 192, 512]) {
  await fs.copyFile(`public/icons/kyoto-trip-c-${size}.png`, `public/icons/icon-${size}.png`);
}
const maskable = await sharp(source).resize(400, 400).png({palette:true,colours:128,effort:10}).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 3, background: cream } })
  .composite([{ input: maskable, left: 56, top: 56 }]).png({palette:true,colours:128,effort:10}).toFile("public/icons/kyoto-trip-c-maskable.png");
for (const [width, height] of [[1170, 2532], [1179, 2556], [1290, 2796], [750, 1334], [1125, 2436]]) {
  const size = Math.round(width * 0.4);
  const logo = await sharp(source).resize(size, size).png({palette:true,colours:128,effort:10}).toBuffer();
  const image = await sharp({ create: { width, height, channels: 3, background: cream } })
    .composite([{ input: logo, left: Math.round((width - size) / 2), top: Math.round(height * 0.37) }]).png({palette:true,colours:128,effort:10}).toBuffer();
  await fs.writeFile(`public/icons/kyoto-trip-c-splash-${width}.png`, image);
  await fs.writeFile(`public/icons/splash-${width}.png`, image);
}
const preview = await sharp(source).resize(550, 550).png({palette:true,colours:128,effort:10}).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: cream } })
  .composite([{ input: preview, left: 325, top: 40 }]).png({palette:true,colours:128,effort:10}).toFile("public/branding/kyoto-trip-c-share.png");
console.log("Kyoto Trip C prepared for favicon, iPhone, PWA, splash and sharing.");
