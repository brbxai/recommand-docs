import { docsSource, integrationsSource, changelogSource, faqSource } from "@/lib/source";
import { getLLMText } from "@/lib/get-llm-text";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";

export const revalidate = false;

function findPage(slug?: string[]) {
  if (!slug || slug.length === 0) return null;

  const prefix = slug[0];
  const rest = slug.slice(1);

  switch (prefix) {
    case "docs":
      return docsSource.getPage(rest.length ? rest : undefined);
    case "integrations":
      return integrationsSource.getPage(rest.length ? rest : undefined);
    case "changelog":
      return changelogSource.getPage(rest.length ? rest : undefined);
    case "faq":
      return faqSource.getPage(rest.length ? rest : undefined);
    default:
      return null;
  }
}

async function getReferenceMd(slug: string[]): Promise<string | null> {
  // slug = ["reference", tagSlug, operationSlug]
  if (slug.length < 2) return null;
  const filePath = path.join(
    process.cwd(),
    "content/reference-md",
    ...slug.slice(1),
  ) + ".md";
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

async function listReferenceMdParams(): Promise<{ slug: string[] }[]> {
  const refDir = path.join(process.cwd(), "content/reference-md");
  const params: { slug: string[] }[] = [];
  try {
    const tags = await fs.readdir(refDir, { withFileTypes: true });
    for (const tag of tags) {
      if (!tag.isDirectory()) continue;
      const tagDir = path.join(refDir, tag.name);
      const files = await fs.readdir(tagDir);
      for (const file of files.filter((f) => f.endsWith(".md"))) {
        const name = file.replace(/\.md$/, "");
        params.push({ slug: ["reference", tag.name, name] });
      }
    }
  } catch {
    // directory doesn't exist yet
  }
  return params;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await context.params;

  // Handle reference markdown pages
  if (slug && slug[0] === "reference") {
    const content = await getReferenceMd(slug);
    if (!content) notFound();
    return new Response(content, {
      headers: {
        "Content-Type": "text/markdown",
      },
    });
  }

  const page = findPage(slug);

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}

export async function generateStaticParams() {
  const allParams: { slug: string[] }[] = [];

  for (const page of docsSource.getPages()) {
    allParams.push({ slug: ["docs", ...page.slugs] });
  }
  for (const page of integrationsSource.getPages()) {
    allParams.push({ slug: ["integrations", ...page.slugs] });
  }
  for (const page of changelogSource.getPages()) {
    allParams.push({ slug: ["changelog", ...page.slugs] });
  }
  for (const page of faqSource.getPages()) {
    allParams.push({ slug: ["faq", ...page.slugs] });
  }

  const refParams = await listReferenceMdParams();
  allParams.push(...refParams);

  return allParams;
}
