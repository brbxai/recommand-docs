import Link from "next/link";
import {
  BookOpen,
  Code2,
  History,
  HelpCircle,
  Puzzle,
  KeyRound,
  Send,
  Building2,
  Inbox,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Card, Cards } from "fumadocs-ui/components/card";
import { SearchTrigger } from "@/components/search-trigger";
import RecommandIcon from "@/components/recommand-icon";
import { changelogSource } from "@/lib/source";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peppol API Documentation",
  description:
    "Everything you need to send and receive documents over the Peppol network. Explore guides, API references, and examples to integrate in minutes.",
};

const quickStartGuides = [
  {
    title: "Authentication",
    href: "/docs/authentication",
    icon: KeyRound,
  },
  {
    title: "Managing Companies",
    href: "/docs/managing-companies",
    icon: Building2,
  },
  {
    title: "Sending Invoices",
    href: "/docs/sending-invoices",
    icon: Send,
  },
  {
    title: "Receiving Documents",
    href: "/docs/receiving-documents",
    icon: Inbox,
  },
];

function getLatestChangelog() {
  const pages = changelogSource.getPages();
  return [...pages]
    .sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 3)
    .map((page) => ({
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      date: page.data.date
        ? new Date(page.data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
    }));
}

export default function HomePage() {
  const latestChanges = getLatestChangelog();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      {/* Hero */}
      <div className="flex flex-col items-center text-center mb-16">
        <RecommandIcon className="mb-8 size-12 text-fd-foreground" />
        <h1 className="text-4xl font-heading font-normal mb-4 sm:text-5xl">
          Recommand Documentation
        </h1>
        <p className="text-fd-muted-foreground text-lg max-w-2xl mb-8">
          Everything you need to send and receive documents over the Peppol
          network. Explore guides, API references, and examples to integrate in
          minutes.
        </p>
        <div className="w-full max-w-md">
          <SearchTrigger />
        </div>
      </div>

      {/* Section cards */}
      <Cards>
        <Card
          icon={<BookOpen />}
          title="Documentation"
          description="Guides and tutorials for the Recommand Peppol API."
          href="/docs"
        />
        <Card
          icon={<Code2 />}
          title="API Reference"
          description="Complete endpoint reference generated from the OpenAPI spec."
          href="/reference"
        />
      </Cards>
      <Cards className="mt-3 grid-cols-3">
        <Card
          icon={<Puzzle />}
          title="Integrations"
          description="Connect Recommand with your existing tools and workflows."
          href="/integrations"
        />
        <Card
          icon={<History />}
          title="Changelog"
          description="Track the latest changes, features, and fixes."
          href="/changelog"
        />
        <Card
          icon={<HelpCircle />}
          title="FAQ"
          description="Frequently asked questions about the Recommand Peppol API."
          href="/faq"
        />
      </Cards>

      {/* Quick Start */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Quick Start</h2>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            View all guides
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickStartGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex items-center gap-3 rounded-lg border border-fd-border p-4 transition-colors hover:border-fd-primary"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
                  <Icon className="size-4.5" />
                </div>
                <span className="font-medium text-sm">{guide.title}</span>
                <ChevronRight className="ml-auto size-4 text-fd-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Latest Updates */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Latest Updates</h2>
          <Link
            href="/changelog"
            className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            Full changelog
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {latestChanges.map((entry) => (
            <Link
              key={entry.url}
              href={entry.url}
              className="flex items-start justify-between gap-4 rounded-lg border border-fd-border bg-fd-card p-4 transition-colors hover:bg-fd-accent no-underline"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-fd-foreground mb-0.5">
                  {entry.title}
                </h3>
                {entry.description && (
                  <p className="text-sm text-fd-muted-foreground line-clamp-1">
                    {entry.description}
                  </p>
                )}
              </div>
              {entry.date && (
                <span className="shrink-0 text-xs text-fd-muted-foreground mt-0.5">
                  {entry.date}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
