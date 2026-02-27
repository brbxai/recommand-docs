import { getChangelogRSS } from "@/lib/rss";

export const revalidate = false;

export function GET() {
  const rss = getChangelogRSS();

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
