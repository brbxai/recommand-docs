import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryItems, getCategoryLabel, getCategories } from "@/lib/faq";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocsPage, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await props.params;
  const items = getCategoryItems(category);
  const label = items ? getCategoryLabel(category, items) : category;
  return {
    title: `FAQ - ${label}`,
    description: `Frequently asked questions about ${label}.`,
  };
}

export default async function FaqCategoryPage(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const items = getCategoryItems(category);
  if (!items) notFound();

  const label = getCategoryLabel(category, items);

  return (
    <DocsPage full>
      <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-sm text-fd-muted-foreground">
        <Link href="/faq" className="hover:text-fd-foreground transition-colors no-underline">
          FAQ
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-fd-foreground">{label}</span>
      </nav>
      <Link
        href="/faq"
        className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors no-underline mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to FAQ
      </Link>
      <DocsTitle>{label}</DocsTitle>
      <DocsDescription>
        Frequently asked questions about {label.toLowerCase()}.
      </DocsDescription>
      <div className="flex-1 space-y-3">
        {items.map((q) => (
          <Link
            key={q.slug}
            href={q.url}
            className="block rounded-lg border border-fd-border bg-fd-card p-4 hover:bg-fd-accent transition-colors no-underline"
          >
            <h3 className="font-medium text-fd-foreground mb-1">
              {q.title}
            </h3>
            {q.excerpt && (
              <p className="text-sm text-fd-muted-foreground line-clamp-2">
                {q.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </DocsPage>
  );
}
