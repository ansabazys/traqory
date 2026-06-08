"use client";

import { useSession } from "@/hooks/use-session";

export default function OverviewPage() {
  const { data } = useSession();

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}