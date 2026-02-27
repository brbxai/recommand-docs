import { faqSource } from "@/lib/source";

export type FaqItem = {
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  excerpt?: string;
  url: string;
};

export type FaqByCategory = Record<string, FaqItem[]>;

function getCategoryFromSlugs(slugs: string[]): string | null {
  return slugs.length >= 2 ? slugs[0] : null;
}

export function getCategoryLabel(slug: string, items?: FaqItem[]): string {
  if (items && items.length > 0 && items[0].categoryLabel) {
    return items[0].categoryLabel;
  }
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export function getAllFaq(): FaqByCategory {
  const pages = faqSource.getPages();
  const byCategory: FaqByCategory = {};

  for (const page of pages) {
    const category = getCategoryFromSlugs(page.slugs);
    if (!category) continue;

    const item: FaqItem = {
      title: page.data.title,
      slug: page.slugs[page.slugs.length - 1],
      category,
      categoryLabel: page.data.category || "",
      excerpt: page.data.excerpt,
      url: page.url,
    };

    if (!byCategory[category]) {
      byCategory[category] = [];
    }
    byCategory[category].push(item);
  }

  for (const key of Object.keys(byCategory)) {
    byCategory[key].sort((a, b) => a.title.localeCompare(b.title));
  }

  return byCategory;
}

export function getCategories(): string[] {
  const data = getAllFaq();
  return Object.keys(data).sort();
}

export function getCategoryItems(category: string): FaqItem[] | null {
  const data = getAllFaq();
  return data[category] || null;
}
