import {
  defineDocs,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
export const reference = defineDocs({ dir: "content/reference" });
export const integrations = defineDocs({
  dir: "content/integrations",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export const changelog = defineCollections({
  type: "doc",
  dir: "content/changelog",
  schema: frontmatterSchema.extend({
    date: z.string().date().or(z.date()),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export const faq = defineDocs({
  dir: "content/faq",
  docs: {
    schema: pageSchema.extend({
      category: z.string().optional(),
      excerpt: z.string().optional(),
      updatedAt: z.string().or(z.date()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig();
