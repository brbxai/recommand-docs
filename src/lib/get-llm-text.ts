import type { InferPageType } from "fumadocs-core/source";
import type { docsSource } from "@/lib/source";

export async function getLLMText(
  page: InferPageType<typeof docsSource>,
): Promise<string> {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
