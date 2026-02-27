import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import RecommandLogo from "@/components/recommand-logo";
import { BookOpen, Code2, History, HelpCircle, Puzzle } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <RecommandLogo className="h-7 w-auto" />,
    },
    githubUrl: "https://github.com/brbxai/recommand-peppol",
    links: [
      {
        text: "Docs",
        url: "/docs",
        icon: <BookOpen />,
        active: "nested-url",
      },
      {
        text: "Reference",
        url: "/reference",
        icon: <Code2 />,
        active: "nested-url",
      },
      {
        text: "Integrations",
        url: "/integrations",
        icon: <Puzzle />,
        active: "nested-url",
      },
      {
        text: "Changelog",
        url: "/changelog",
        icon: <History />,
        active: "nested-url",
      },
      {
        text: "FAQ",
        url: "/faq",
        icon: <HelpCircle />,
        active: "nested-url",
      },
    ],
  };
}
