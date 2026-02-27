import { loader } from "fumadocs-core/source";
import { docs, reference, integrations, changelog, faq } from "@/.source/server";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { openapiPlugin } from "fumadocs-openapi/server";
import { createElement } from "react";

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const referenceSource = loader({
  baseUrl: "/reference",
  source: reference.toFumadocsSource(),
  plugins: [openapiPlugin()],
});

const integrationIcons: Record<string, string> = {
  harvest: "/integrations/harvest.png",
  erpnext: "/integrations/erpnext.png",
  exact: "/integrations/exact.png",
  yuki: "/integrations/yuki.png",
  clearfacts: "/integrations/clearfacts.png",
};

export const integrationsSource = loader({
  baseUrl: "/integrations",
  source: integrations.toFumadocsSource(),
  icon(id) {
    if (!id || !(id in integrationIcons)) return;
    return createElement("img", {
      src: integrationIcons[id],
      alt: "",
      width: 16,
      height: 16,
    });
  },
});

export const changelogSource = loader({
  baseUrl: "/changelog",
  source: toFumadocsSource(changelog, []),
});

export const faqSource = loader({
  baseUrl: "/faq",
  source: faq.toFumadocsSource(),
});
