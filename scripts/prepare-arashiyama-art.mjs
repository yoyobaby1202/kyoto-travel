import fs from "node:fs";
import sharp from "sharp";
const [background, train, boat] = process.argv.slice(2);
if (!background || !train || !boat)
  throw new Error(
    "Usage: node scripts/prepare-arashiyama-art.mjs background.png train.png boat.png",
  );
const dir = "public/illustrations/arashiyama";
fs.mkdirSync(dir, { recursive: true });
const metadata = await sharp(background).metadata();
await sharp(background)
  .webp({ quality: 92, effort: 6 })
  .toFile(`${dir}/background.webp`);
for (const [name, file] of [
  ["train", train],
  ["boat", boat],
]) {
  await sharp(file)
    .trim({ threshold: 12 })
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(`${dir}/${name}.webp`);
}
const manifest = {
  width: metadata.width,
  height: metadata.height,
  cropTop: 140,
};
for (const name of ["train", "boat"]) {
  const m = await sharp(`${dir}/${name}.webp`).metadata();
  manifest[name] = { width: m.width, height: m.height, hasAlpha: m.hasAlpha };
}
fs.writeFileSync(`${dir}/art.json`, JSON.stringify(manifest, null, 2));
console.log(manifest);
for (const name of ["background", "train", "boat"])
  console.log(name, fs.statSync(`${dir}/${name}.webp`).size);
