import Link from "next/link";
import { getAllFaq, getCategoryLabel } from "@/lib/faq";
import { DocsPage, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Recommand and Peppol.",
};

export default function FaqIndex() {
  const data = getAllFaq();
  const categories = Object.keys(data).sort();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(data)
      .flat()
      .map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.excerpt || "",
        },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <DocsPage
        toc={categories.map((cat) => ({
          title: getCategoryLabel(cat, data[cat]),
          url: `#${cat}`,
          depth: 2,
        }))}
      >
        <DocsTitle>FAQ</DocsTitle>
      <DocsDescription>
        Frequently asked questions about Recommand and Peppol.
      </DocsDescription>
      <div className="flex-1 space-y-12">
        {categories.map((cat) => {
          const label = getCategoryLabel(cat, data[cat]);
          return (
            <div key={cat} id={cat} className="scroll-mt-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-fd-muted-foreground">
                  {label}
                </h2>
                <Link
                  href={`/faq/${encodeURIComponent(cat)}`}
                  className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors no-underline"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {data[cat].map((q) => (
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
            </div>
          );
        })}
      </div>
    </DocsPage>
    </>
  );
}
