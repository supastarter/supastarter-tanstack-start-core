"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { orpc } from "@/lib/orpc";

export const Greeting = () => {
  const greeting = useQuery(
    orpc.greeting.queryOptions({ input: { name: "supastarter" } })
  );

  return (
    <div className="flex items-center justify-between gap-4">
      <p
        aria-live="polite"
        className={greeting.isError ? "text-destructive" : undefined}
      >
        {greeting.isError
          ? "Could not reach the API."
          : (greeting.data?.message ?? "Loading…")}
      </p>
      <Button
        variant="outline"
        size="sm"
        disabled={greeting.isFetching}
        onClick={(): void => {
          greeting.refetch().catch(() => true);
        }}
      >
        Refetch
      </Button>
    </div>
  );
};
