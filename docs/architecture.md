# Architecture

A pnpm workspace orchestrated by Turborepo.

```
apps/
  web/        TanStack Start app: pages + server route (name: web)
packages/
  api/        @repo/api: oRPC router, request handler, typed client
  ui/         @repo/ui: theme tokens
tooling/
  typescript/ @repo/typescript-config: strict tsconfig presets
  oxc/        @repo/oxc-config: Oxlint presets
```

Workspace packages export TypeScript source directly. The web app compiles them as part of its
build.

## API

`packages/api` defines every procedure in `src/router.ts` with oRPC. Inputs are validated with Zod.

- `@repo/api/server` exports `handleApiRequest`, a fetch handler. The web app mounts it at
  `/api/rpc` in `apps/web/src/routes/api/rpc/$.ts`, a TanStack Start server route. The `$` segment
  matches the procedure path (`/api/rpc/health`, `/api/rpc/greeting`, …).
- `@repo/api/client` exports `createApiClient`, which returns a client typed from the router. It
  imports only types from the server code, so no server code reaches a bundle.

The web app wraps the client with `createTanstackQueryUtils` in `apps/web/src/lib/orpc.ts` and calls
procedures through TanStack Query, for example `useQuery(orpc.greeting.queryOptions({ input }))`.

Procedures accept POST. A procedure opts in to GET with `.route({ method: "GET" })`, as `health`
does for uptime checks (`GET /api/rpc/health`).

## UI and theming

`packages/ui/theme.css` defines the olive palette from supastarter for Next.js, using the
shadcn/ui token names.

- `:root` sets the light values and `.dark` overrides them for dark mode.
- `@theme inline` maps them to Tailwind utilities (`bg-background`, `text-primary`, `rounded-lg`, …).

The web app imports the tokens in `apps/web/src/styles/globals.css` and defines the page gradient and
typography there. The root route links that stylesheet. Inter and DM Sans are served locally from
the Fontsource packages. Tailwind 4 runs through `@tailwindcss/vite`.

The color mode control (`apps/web/src/components/color-mode-toggle.tsx`) offers System, Light and
Dark. System is the default and follows the device setting. Next-themes stores the choice in
`localStorage` and sets the class on `<html>` before the page paints. Read or change the mode with
`useTheme()` from `next-themes`.

The shadcn CLI copies components based on Base UI into `apps/web/src/components/ui`. The config is
`base-nova` with the olive palette and CSS variables, the same setup as the Next.js core, with
`rsc` off because this app does not use React Server Components. Components that render a different
element take a `render` prop, for example `<Button render={<a href="/" />} />`.

## Routing

TanStack Start file routes live in `apps/web/src/routes`. `src/router.tsx` builds the router from
the generated `src/routeTree.gen.ts`. The Vite plugin rewrites that file during `dev` and `build`;
commit it with route changes. It is excluded from Oxlint and Oxfmt. The Router CLI is not used,
because its output omits the Start register block the Vite plugin appends.

`src/routes/__root.tsx` renders the HTML document, the theme and query providers, and the outlet.
`src/routes/index.tsx` is the home page.

## Environment variables

The web app validates its variables with `@t3-oss/env-core` and Zod in `apps/web/src/env.ts` and
reads them through the exported `env` object. The Vite config imports the module so `vite build`
validates the environment. Client variables use the `VITE_` prefix and have to be passed from
`import.meta.env` inside `runtimeEnv`. See `apps/web/.env.example` for the supported variables.

## Hosting

The same route modules build for Node, Vercel and Cloudflare. `apps/web/vite.config.ts` picks the
hosting plugin:

- **Nitro** (default) writes a Node server to `.output/` (`pnpm --filter web start`). When `VERCEL`
  is set, Nitro writes the Vercel build output instead. This is the build `pnpm verify` and
  Playwright use.
- **Cloudflare** (`DEPLOY_TARGET=cloudflare`, `pnpm --filter web build:cloudflare`) uses
  `@cloudflare/vite-plugin`. `wrangler.jsonc` sets the source entry to
  `@tanstack/react-start/server-entry`. Deploy with `wrangler deploy` and do not pass
  `--config wrangler.jsonc`; the plugin generates the config Wrangler should read.

See the root README for the project settings on each host, and
[`docs/decisions/0001-host-tanstack-start-on-vercel-and-cloudflare.md`](decisions/0001-host-tanstack-start-on-vercel-and-cloudflare.md)
for why the two plugins stay separate.

## Testing

- **Unit tests:** Vitest, for plain TypeScript in packages (`src/**/*.test.ts`). `packages/api`
  tests procedures directly and through the HTTP handler with the typed client.
- **Web end-to-end:** Playwright runs `apps/web/e2e` against the Nitro production build. The smoke
  tests load the home page, which renders data from the API, switch the color mode and call the API
  over HTTP. CI also runs the Cloudflare build so that target cannot drift.

## Tooling

- TypeScript 7 in strict mode with `noUncheckedIndexedAccess`. Presets live in `tooling/typescript`.
  The web preset turns `verbatimModuleSyntax` off. TanStack Start documents that leaving it on can
  leak server modules into the client bundle.
- Oxlint with type-aware rules. Presets live in `tooling/oxc`; each package has a `.oxlintrc.json`.
- Oxfmt formats the whole repository from the root `.oxfmtrc.json`, including import and Tailwind
  class order.
- Turbo runs `lint`, `type-check`, `test` and `build` per package. These tasks depend on a `transit`
  task, so a change in a package invalidates the cache of every package that uses it.

## Decisions

`docs/decisions/` records product decisions, one file per decision. See
[`docs/decisions/README.md`](decisions/README.md) for the format.
