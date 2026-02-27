import type { MetadataRoute } from "next";
import {
  docsSource,
  referenceSource,
  integrationsSource,
  changelogSource,
  faqSource,
} from "@/lib/source";
import { getCategories } from "@/lib/faq";

const BASE_URL = "https://docs.recommand.eu";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes
  entries.push({ url: BASE_URL, lastModified: new Date() });
  entries.push({ url: `${BASE_URL}/faq`, lastModified: new Date() });

  // Docs pages
  for (const page of docsSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
    });
  }

  // API reference pages
  for (const page of referenceSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
    });
  }

  // Integration pages
  for (const page of integrationsSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
    });
  }

  // Changelog pages
  for (const page of changelogSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.data.date ? new Date(page.data.date) : new Date(),
    });
  }

  // FAQ pages
  for (const page of faqSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
    });
  }

  // FAQ category pages
  for (const category of getCategories()) {
    entries.push({
      url: `${BASE_URL}/faq/${encodeURIComponent(category)}`,
      lastModified: new Date(),
    });
  }

  return entries;
}
