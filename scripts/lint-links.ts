import fs from "node:fs";
import path from "node:path";
import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
} from "next-validate-link";

function extractHeadings(content: string): string[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1].toLowerCase().replace(/\s+/g, "-"));
  }
  return headings;
}

function toSlugs(basedir: string, filePath: string): string[] {
  const rel = path
    .relative(basedir, filePath)
    .replace(/\.(md|mdx)$/, "");
  const parts = rel.split(path.sep);
  // index files map to the parent route (empty slug for [[...slug]])
  if (parts[parts.length - 1] === "index") {
    parts.pop();
  }
  return parts;
}

/** Find subdirectories that act as fumadocs folder pages. */
function getFolderSlugs(contentDir: string): string[][] {
  const slugs: string[][] = [];
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs.push([entry.name]);
    }
  }
  return slugs;
}

async function checkLinks() {
  const docsFiles = await readFiles("content/docs/**/*.{md,mdx}");
  const referenceFiles = await readFiles("content/reference/**/*.{md,mdx}");
  const integrationsFiles = await readFiles(
    "content/integrations/**/*.{md,mdx}"
  );
  const changelogFiles = await readFiles("content/changelog/**/*.{md,mdx}");
  const faqFiles = await readFiles("content/faq/**/*.{md,mdx}");

  // Folder slugs for fumadocs category/group pages (no index file but valid URLs)
  const referenceFolderSlugs = getFolderSlugs("content/reference").map(
    (slug) => ({ value: slug })
  );

  const scanned = await scanURLs({
    preset: "next",
    populate: {
      "(docs)/docs/[[...slug]]": docsFiles.map((file) => ({
        value: toSlugs("content/docs", file.path),
        hashes: extractHeadings(file.content),
      })),
      "(docs)/reference/[[...slug]]": [
        ...referenceFiles.map((file) => ({
          value: toSlugs("content/reference", file.path),
          hashes: extractHeadings(file.content),
        })),
        ...referenceFolderSlugs,
      ],
      "(docs)/integrations/[[...slug]]": integrationsFiles.map((file) => ({
        value: toSlugs("content/integrations", file.path),
        hashes: extractHeadings(file.content),
      })),
      "(docs)/changelog/[[...slug]]": changelogFiles.map((file) => ({
        value: toSlugs("content/changelog", file.path),
        hashes: extractHeadings(file.content),
      })),
      "(docs)/faq/[category]/[slug]": faqFiles.map((file) => {
        const parts = toSlugs("content/faq", file.path);
        return {
          value: { category: parts[0], slug: parts.slice(1).join("/") },
          hashes: extractHeadings(file.content),
        };
      }),
    },
  });

  const allFiles = [
    ...docsFiles,
    ...referenceFiles,
    ...integrationsFiles,
    ...changelogFiles,
    ...faqFiles,
  ];

  const results = await validateFiles(allFiles, {
    scanned,
    checkRelativePaths: "as-url",
    markdown: {
      components: {
        Card: { attributes: ["href"] },
        Cards: { attributes: ["href"] },
      },
    },
  });

  printErrors(results, true);
}

void checkLinks();
