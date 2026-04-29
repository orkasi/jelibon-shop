import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "public", "images");
const outputDir = path.join(sourceDir, "optimized");
const isCheck = process.argv.includes("--check");
const quality = Number(process.env.IMAGE_WEBP_QUALITY || 82);

const sourceFiles = (await readdir(sourceDir))
  .filter((file) => file.endsWith(".png"))
  .sort();

if (sourceFiles.length === 0) {
  throw new Error(`No PNG images found in ${sourceDir}`);
}

const outputPathFor = (file) =>
  path.join(outputDir, `${path.basename(file, ".png")}.webp`);

if (isCheck) {
  const stale = [];

  for (const file of sourceFiles) {
    const sourcePath = path.join(sourceDir, file);
    const outputPath = outputPathFor(file);

    try {
      const [sourceStats, outputStats] = await Promise.all([
        stat(sourcePath),
        stat(outputPath),
      ]);

      if (outputStats.mtimeMs < sourceStats.mtimeMs) {
        stale.push(`${path.relative(root, outputPath)} is older than ${path.relative(root, sourcePath)}`);
      }
    } catch {
      stale.push(`${path.relative(root, outputPath)} is missing`);
    }
  }

  if (stale.length > 0) {
    console.error("Optimized WebP images are out of date:");
    stale.forEach((item) => console.error(`- ${item}`));
    console.error("Run `npm run optimize:images` and commit the generated files.");
    process.exit(1);
  }

  console.log(`Verified ${sourceFiles.length} optimized WebP images.`);
  process.exit(0);
}

const { default: sharp } = await import("sharp");

await mkdir(outputDir, { recursive: true });

let sourceBytes = 0;
let outputBytes = 0;

for (const file of sourceFiles) {
  const sourcePath = path.join(sourceDir, file);
  const outputPath = outputPathFor(file);

  await sharp(sourcePath).webp({ quality, effort: 6 }).toFile(outputPath);

  const [sourceStats, outputStats] = await Promise.all([
    stat(sourcePath),
    stat(outputPath),
  ]);

  sourceBytes += sourceStats.size;
  outputBytes += outputStats.size;
}

const savedPercent = Math.round((1 - outputBytes / sourceBytes) * 100);
console.log(
  `Optimized ${sourceFiles.length} images to WebP at quality ${quality}. Saved ${savedPercent}% (${formatBytes(sourceBytes)} -> ${formatBytes(outputBytes)}).`
);

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
