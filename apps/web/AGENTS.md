# apps/web

TanStack Start app (Vite, file-based routes). Read the root [`AGENTS.md`](../../AGENTS.md) and
[`docs/architecture.md`](../../docs/architecture.md) first.

- Routes live in `src/routes`. `__root.tsx` is the HTML document. `index.tsx` is the home page.
- Server routes export `server.handlers` from `createFileRoute`. The oRPC handler is
  `src/routes/api/rpc/$.ts`.
- Do not use Next.js (`next/link`, `next/image`, the App Router, route handlers, `NEXT_PUBLIC_`).
- Default `pnpm build` uses Nitro: a Node server for local production, and the Vercel build when
  `VERCEL` is set. `pnpm build:cloudflare` swaps in the Cloudflare Vite plugin. See the root README.
- After adding or renaming a route, run `pnpm dev` or `pnpm build` and commit the updated
  `src/routeTree.gen.ts`. Do not edit or format it by hand, and do not regenerate it with the
  Router CLI.
- shadcn/ui uses Base UI (`style` `base-nova`, olive palette). Components that render a different
  element take a `render` prop, for example `<Button render={<a href="/" />} />`.
- TanStack Start documents that `verbatimModuleSyntax` can pull server modules into the client
  bundle. The web TypeScript preset turns it off. Do not turn it back on.
