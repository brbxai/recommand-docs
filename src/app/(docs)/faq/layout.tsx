import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={{ name: "", children: [] }}
      nav={{ enabled: false }}
      sidebar={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
