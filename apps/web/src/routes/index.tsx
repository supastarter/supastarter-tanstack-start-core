import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightIcon, TerminalIcon } from "lucide-react";

import { ColorModeToggle } from "@/components/color-mode-toggle";
import { Greeting } from "@/components/greeting";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage = () => (
  <>
    <header className="container flex h-16 items-center justify-between gap-3 md:h-[4.25rem]">
      <Link
        to="/"
        className="font-heading inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight"
      >
        <span
          className="flex size-7 shrink-0 flex-col items-center justify-center gap-[3.5px]"
          aria-hidden="true"
        >
          <span className="h-1 w-2 rounded-full bg-current" />
          <span className="bg-touch h-1 w-3.5 rounded-full" />
          <span className="h-1 w-5 rounded-full bg-current" />
        </span>
        supastarter
      </Link>
      <ColorModeToggle />
    </header>
    <main className="container pt-16 pb-20 md:pt-24 lg:pt-28">
      <h1 className="text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
        supastarter
      </h1>
      <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
        A TanStack Start starter with a typed API and a ready-to-use design
        system.
      </p>
      <a
        href="#api-preview"
        className={buttonVariants({ size: "lg", className: "mt-8" })}
      >
        Try the API <ArrowRightIcon aria-hidden="true" />
      </a>

      <section
        id="api-preview"
        aria-labelledby="api-title"
        className="mt-12 scroll-mt-6 md:mt-16"
      >
        <Card className="gap-0 pt-0 shadow-[0_24px_80px_-32px] shadow-olive-950/30 dark:shadow-black/70">
          <div className="bg-muted/35 text-muted-foreground flex items-center gap-2.5 border-b px-4 py-3 sm:px-6">
            <TerminalIcon className="size-4" aria-hidden="true" />
            <code className="text-xs">POST /api/rpc/greeting</code>
          </div>
          <CardHeader className="pt-6">
            <CardTitle>
              <h2 id="api-title" className="text-xl font-medium tracking-tight">
                Live API demo
              </h2>
            </CardTitle>
            <CardDescription>
              This greeting comes from the oRPC endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <Greeting />
          </CardContent>
        </Card>
        <p className="text-muted-foreground mt-6 text-sm">
          Edit <code>apps/web/src/routes/index.tsx</code> to make this page your
          own.
        </p>
      </section>
    </main>
  </>
);

export const Route = createFileRoute("/")({
  component: HomePage,
});
