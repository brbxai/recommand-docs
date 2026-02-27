import "server-only";

import { Feed } from "feed";
import { changelogSource } from "@/lib/source";

const baseUrl = "https://docs.recommand.eu";

export function getChangelogRSS(): string {
  const feed = new Feed({
    title: "Recommand Peppol API Changelog",
    id: `${baseUrl}/changelog`,
    link: `${baseUrl}/changelog`,
    language: "en",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Recommand`,
  });

  const pages = [...changelogSource.getPages()].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  for (const page of pages) {
    const date = page.data.date ? new Date(page.data.date) : new Date();

    feed.addItem({
      id: `${baseUrl}${page.url}`,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date,
    });
  }

  return feed.rss2();
}
