import { RootProvider } from "fumadocs-ui/provider/next";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider theme={{ enabled: true }}>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </RootProvider>
  );
}
