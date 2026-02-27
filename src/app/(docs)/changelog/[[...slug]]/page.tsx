import { changelogSource } from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx-components";
import { PageActions } from "@/components/page-actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type ChangelogGroup = {
  date: string;
  dateLabel: string;
  entries: {
    title: string;
    description?: string;
    url: string;
    date: string;
  }[];
};

function groupByDate(
  pages: ReturnType<typeof changelogSource.getPages>
): ChangelogGroup[] {
  const groups: Record<string, ChangelogGroup> = {};

  const sorted = [...pages].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  for (const page of sorted) {
    const dateStr = page.data.date
      ? new Date(page.data.date).toISOString().split("T")[0]
      : "unknown";

    if (!groups[dateStr]) {
      groups[dateStr] = {
        date: dateStr,
        dateLabel: page.data.date
          ? new Date(page.data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown date",
        entries: [],
      };
    }

    groups[dateStr].entries.push({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      date: dateStr,
    });
  }

  return Object.values(groups).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function ChangelogIndex() {
  const pages = changelogSource.getPages();
  const groups = groupByDate(pages);

  return (
    <DocsPage full>
      <DocsTitle>Changelog</DocsTitle>
      <DocsDescription>
        Stay up to date with the latest changes to the Recommand API.
      </DocsDescription>
      <div className="flex-1 space-y-10">
        {groups.map((group) => (
          <div key={group.date}>
            <h2 className="text-sm font-semibold text-fd-muted-foreground mb-4">
              {group.dateLabel}
            </h2>
            <div className="space-y-3">
              {group.entries.map((entry) => (
                <Link
                  key={entry.url}
                  href={entry.url}
                  className="block rounded-lg border border-fd-border bg-fd-card p-4 hover:bg-fd-accent transition-colors no-underline"
                >
                  <h3 className="font-medium text-fd-foreground mb-1">
                    {entry.title}
                  </h3>
                  {entry.description && (
                    <p className="text-sm text-fd-muted-foreground line-clamp-2">
                      {entry.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DocsPage>
  );
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug) {
    return <ChangelogIndex />;
  }

  const page = changelogSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const dateLabel = page.data.date
    ? new Date(page.data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Link
        href="/changelog"
        className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors no-underline mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to changelog
      </Link>
      {dateLabel && (
        <p className="text-sm text-fd-muted-foreground mb-2">{dateLabel}</p>
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pt-2 pb-6">
        <PageActions markdownUrl={`${page.url}.md`} />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return changelogSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  if (!params.slug) {
    return {
      title: "Changelog",
      alternates: {
        types: {
          "application/rss+xml": [
            {
              title: "Recommand Peppol API Changelog",
              url: "/rss/changelog.xml",
            },
          ],
        },
      },
    };
  }
  const page = changelogSource.getPage(params.slug);
  if (!page) return {};

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
