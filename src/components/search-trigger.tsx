"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { Search } from "lucide-react";

export function SearchTrigger() {
  const { setOpenSearch, hotKey } = useSearchContext();

  return (
    <button
      type="button"
      className="inline-flex w-full items-center gap-2 rounded-lg border bg-fd-background p-2 ps-3 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
      onClick={() => setOpenSearch(true)}
    >
      <Search className="size-4" />
      Search documentation...
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd
            key={i}
            className="rounded-md border bg-fd-background px-1.5"
          >
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  );
}
