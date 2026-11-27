import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { NotFound } from "@/components/not-found";
import { Providers } from "@/components/providers";

import globalsCss from "@/styles/globals.css?url";

const RootComponent = () => (
  <Providers>
    <Outlet />
  </Providers>
);

const RootDocument = ({ children }: { readonly children: ReactNode }) => (
  // next-themes sets the color mode class on <html> before React hydrates.
  <html lang="en" suppressHydrationWarning>
    <head>
      <HeadContent />
    </head>
    <body>
      {children}
      <Scripts />
    </body>
  </html>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "supastarter" },
      { name: "description", content: "Built with supastarter." },
    ],
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
});
