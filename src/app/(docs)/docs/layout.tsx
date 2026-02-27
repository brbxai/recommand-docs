import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { docsSource } from "@/lib/source";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={docsSource.pageTree}
      nav={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
