import { notFound } from "next/navigation";
import Link from "next/link";
import { faqSource } from "@/lib/source";
import { getCategoryItems, getCategoryLabel } from "@/lib/faq";
import { getMDXComponents } from "@/components/mdx-components";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return faqSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await props.params;
  const page = faqSource.getPage([category, slug]);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.excerpt || page.data.description,
  };
}

export default async function FaqQuestionPage(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await props.params;
  const page = faqSource.getPage([category, slug]);
  if (!page) notFound();

  const items = getCategoryItems(category);
  const categoryLabel =
    page.data.category || getCategoryLabel(category, items || undefined);

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-sm text-fd-muted-foreground">
        <Link href="/faq" className="hover:text-fd-foreground transition-colors no-underline">
          FAQ
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/faq/${encodeURIComponent(category)}`} className="hover:text-fd-foreground transition-colors no-underline">
          {categoryLabel}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-fd-foreground truncate max-w-[200px]">{page.data.title}</span>
      </nav>
      <Link
        href={`/faq/${encodeURIComponent(category)}`}
        className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors no-underline mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {categoryLabel}
      </Link>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.excerpt}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}
