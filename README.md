# supastarter

A TypeScript monorepo for building a TanStack Start web app with a typed API.

| Path           | What it is                                                          |
| -------------- | ------------------------------------------------------------------- |
| `apps/web`     | TanStack Start app. Serves the pages and the API at `/api/rpc`      |
| `packages/api` | API procedures (oRPC + Zod), the request handler and a typed client |
| `packages/ui`  | Tailwind CSS design tokens (colors, radii)                          |
| `tooling/*`    | Shared TypeScript and Oxlint configuration                          |

The web app uses Tailwind CSS and shadcn/ui on Base UI, with the olive palette and Inter and DM Sans
typefaces from supastarter for Next.js. It offers System, Light and Dark color modes, with System as
the default.

See [`docs/architecture.md`](docs/architecture.md) for how the pieces fit together.

## Requirements

- Node.js 26, the active LTS release (`.nvmrc`)
- pnpm 12.18.0. Node 26 no longer ships Corepack, so install it with `npm install -g pnpm@12.18.0`

## Getting started

```sh
nvm use
pnpm install
pnpm dev
```

`pnpm dev` starts the web app on http://localhost:3000.

The web app requires no environment variables. Its optional variables are listed in
`apps/web/.env.example`.

## Commands

Run these at the repository root. Turbo runs each task in every package that defines it and caches
the results. Add `--filter <package>` to limit a task to one package, for example
`pnpm lint --filter web`.

| Command                              | What it does                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| `pnpm dev`                           | Start the web app                                                                        |
| `pnpm check`                         | Format check, lint (type-aware), type-check and unit tests. Never writes files           |
| `pnpm verify`                        | `check`, the production build and the web end-to-end tests                               |
| `pnpm build`                         | Build the web app for Node and Vercel (Nitro)                                            |
| `pnpm --filter web build:cloudflare` | Build the web app for Cloudflare Workers                                                 |
| `pnpm test`                          | Unit tests (Vitest). Run one file with `pnpm --filter @repo/api test src/router.test.ts` |
| `pnpm test:e2e`                      | Build the web app, then run the Playwright smoke tests against it                        |
| `pnpm format`                        | Format all files (Oxfmt)                                                                 |
| `pnpm lint:fix`                      | Apply Oxlint auto-fixes                                                                  |

The end-to-end tests need a browser once: `pnpm --filter web exec playwright install chromium`.

`pnpm dev` and `pnpm build` regenerate `apps/web/src/routeTree.gen.ts`. Commit it after adding or
renaming a route. `pnpm check` does not write it.

## Deployment

Application code is the same on every host. The Vite plugin changes.

| Host                           | Plugin                    | Command                                                                          |
| ------------------------------ | ------------------------- | -------------------------------------------------------------------------------- |
| Node, Docker, local production | Nitro (default)           | `pnpm --filter web build`, then `pnpm --filter web start`                        |
| Vercel                         | Nitro                     | `pnpm --filter web build` (Vercel sets `VERCEL` during the build)                |
| Cloudflare Workers             | `@cloudflare/vite-plugin` | `pnpm --filter web build:cloudflare`, then `pnpm --filter web deploy:cloudflare` |

Nitro's Vite plugin ships in Nitro 3 (`nitro`). That line is still published as a release
candidate. TanStack Start's Node and Vercel guides install it, and Nitro 2 does not provide
`nitro/vite`.

### Vercel

1. Import the repository. Set the root directory to `apps/web`. Vercel installs the pnpm workspace
   from the repository root.
2. Use the TanStack Start framework preset. The build command is the package script, `pnpm build`.
   Nitro detects `VERCEL` and writes `.vercel/output`.
3. No environment variables are required.

### Cloudflare Workers

`apps/web/wrangler.jsonc` points `main` at `@tanstack/react-start/server-entry` and enables
`nodejs_compat`. Change `name` if that Worker name is already taken on the account.

From `apps/web`:

```sh
pnpm build:cloudflare
pnpm exec wrangler deploy
```

Do not pass `--config wrangler.jsonc`. The Cloudflare Vite plugin writes a generated config under
`.wrangler/deploy` that points at the built server and assets. Forcing the source config skips that
output.

`pnpm preview:cloudflare` serves the Workers build locally. Build with `pnpm build:cloudflare`
first.

For Workers Builds, set the root directory to `apps/web`, the build command to
`pnpm build:cloudflare`, and the deploy command to `pnpm exec wrangler deploy`.

## Common tasks

- **Add an API procedure** in `packages/api/src/router.ts`. The web app gets typed access
  through the `orpc` helper in `apps/web/src/lib/orpc.ts`.
- **Add a page** by creating a file in `apps/web/src/routes`, then run `pnpm dev` or `pnpm build`
  and commit `apps/web/src/routeTree.gen.ts`.
- **Add a UI component** with `pnpm --dir apps/web exec shadcn add <name>`.
- **Change the theme** by editing the `:root` and `.dark` tokens in `packages/ui/theme.css`.
- **Add an environment variable:** declare it in the app's `src/env.ts` and list it in its
  `.env.example`. Client variables use the `VITE_` prefix.

## CI

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`:

- **Check:** `pnpm check`.
- **Web build + e2e:** installs only the web app and its packages, builds the Nitro output and runs
  Playwright. It then builds the Cloudflare Workers output. Reports and traces are uploaded when a
  test fails.

Every job fails if it changes a tracked file.

## Third-party attribution

The components in `apps/web/src/components/ui/` include code from
[shadcn/ui](https://github.com/shadcn-ui/ui).

<details>
<summary>MIT license for shadcn/ui</summary>

```text
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

</details>
