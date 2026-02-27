import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { createAPIPage } from "fumadocs-openapi/ui";
import { openapi } from "@/lib/openapi";
import type { MDXComponents } from "mdx/types";

const APIPage = createAPIPage(openapi);

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    APIPage,
    ...components,
  };
}
