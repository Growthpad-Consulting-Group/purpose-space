import { createReadStream, existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import process from "node:process";
import { createClient } from "@sanity/client";

const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const DRY_RUN = process.argv.includes("--dry-run");
const manifestPath = resolve(
  process.env.PROPERTY_MANIFEST || "content/properties.json",
);
const imageRoot = process.env.PROPERTY_IMAGE_ROOT
  ? resolve(process.env.PROPERTY_IMAGE_ROOT)
  : null;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET are required.",
  );
}

if (!DRY_RUN && !token) {
  throw new Error("SANITY_API_WRITE_TOKEN is required unless --dry-run is used.");
}

if (!existsSync(manifestPath)) {
  throw new Error(`Property manifest not found: ${manifestPath}`);
}

const properties = JSON.parse(readFileSync(manifestPath, "utf8"));
const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: false,
});

function findImages(folderName) {
  if (!folderName || !imageRoot) return [];

  const folderPath = join(imageRoot, folderName);
  if (!existsSync(folderPath)) return [];

  return readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(folderPath, entry.name))
    .filter((filePath) => IMAGE_EXTENSIONS.has(extname(filePath).toLowerCase()))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

async function uploadImage(filePath, propertyTitle, index) {
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: filePath.split("/").at(-1),
    title: `${propertyTitle} ${index + 1}`,
  });

  return {
    _type: "image",
    _key: `image-${index + 1}`,
    alt: `${propertyTitle} — property image ${index + 1}`,
    asset: { _type: "reference", _ref: asset._id },
  };
}

let importableCount = 0;
let draftCount = 0;
const missingImageFolders = [];

for (const [index, property] of properties.entries()) {
  const imagePaths = findImages(property.imageFolder);

  if (imageRoot && property.imageFolder && imagePaths.length === 0) {
    missingImageFolders.push(property.imageFolder);
  }

  if (DRY_RUN) {
    console.log(
      `[dry-run] ${property.title}: ${imagePaths.length} image(s)${
        property.imageFolder ? ` from “${property.imageFolder}”` : " — no image folder supplied"
      }`,
    );
    if (imagePaths.length > 0) {
      importableCount += 1;
    } else {
      draftCount += 1;
    }
    continue;
  }

  const images = [];
  for (const [imageIndex, imagePath] of imagePaths.entries()) {
    images.push(await uploadImage(imagePath, property.title, imageIndex));
  }

  const document = {
    ...property,
    _id: images.length > 0
      ? `property-${property.slug}`
      : `drafts.property-${property.slug}`,
    _type: "property",
    slug: { _type: "slug", current: property.slug },
    sortOrder: property.sortOrder ?? index + 1,
    featured: property.featured ?? false,
    image: images[0],
    gallery: images,
  };

  delete document.imageFolder;

  await client.createOrReplace(document);
  if (images.length > 0) {
    importableCount += 1;
    console.log(`Published ${property.title} with ${images.length} image(s).`);
  } else {
    draftCount += 1;
    console.log(`Created an unpublished draft for ${property.title}; images are still required.`);
  }
}

console.log(
  `Processed ${properties.length} properties; ${importableCount} published and ${draftCount} left as drafts.`,
);

if (missingImageFolders.length > 0) {
  console.warn(
    `Missing or empty image folders: ${[...new Set(missingImageFolders)].join(", ")}`,
  );
}
