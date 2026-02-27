import { docsSource, changelogSource, faqSource } from "@/lib/source";
import fs from "fs/promises";
import path from "path";

export const revalidate = false;

export async function GET() {
  const lines: string[] = [];

  lines.push("# Recommand Documentation");
  lines.push("");
  lines.push(
    "> Recommand provides a Peppol API and documentation for building, testing, and integrating Peppol-based electronic document flows into your applications and workflows.",
  );
  lines.push("");
  lines.push(
    "This file is intended for large language models and tools. It lists the most relevant documentation pages in a compact, markdown-friendly format.",
  );
  lines.push(
    "Each link points to a markdown version of a documentation page that is suitable for use as LLM context.",
  );
  lines.push("");

  lines.push("## Guides");
  lines.push("");
  for (const page of docsSource.getPages()) {
    const title = page.data.title ?? page.url;
    const description = page.data.description;
    const suffix = description ? `: ${description}` : "";
    lines.push(`- [${title}](${page.url}.mdx)${suffix}`);
  }
  lines.push("");

  // API Reference — read generated index.md for endpoint links
  const refDir = path.join(process.cwd(), "content/reference-md");
  try {
    const indexMd = await fs.readFile(path.join(refDir, "index.md"), "utf-8");
    // Strip frontmatter and use the body directly
    const body = indexMd.replace(/^---[\s\S]*?---\s*/, "");
    lines.push(body.trim());
    lines.push("");
  } catch {
    lines.push("## API Reference");
    lines.push("");
    lines.push(
      "- [OpenAPI Spec](https://app.recommand.eu/openapi)",
    );
    lines.push("");
  }

  lines.push("## Changelog");
  lines.push("");
  for (const page of changelogSource.getPages()) {
    const title = page.data.title ?? page.url;
    const description = page.data.description;
    const suffix = description ? `: ${description}` : "";
    lines.push(`- [${title}](${page.url}.mdx)${suffix}`);
  }
  lines.push("");

  lines.push("## FAQ");
  lines.push("");
  for (const page of faqSource.getPages()) {
    const title = page.data.title ?? page.url;
    const description = page.data.description;
    const suffix = description ? `: ${description}` : "";
    lines.push(`- [${title}](${page.url}.mdx)${suffix}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(
    "- [Full documentation](/llms-full.txt): Single-file markdown snapshot of all documentation pages. Use this when a larger context window is acceptable.",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/markdown",
    },
  });
}
