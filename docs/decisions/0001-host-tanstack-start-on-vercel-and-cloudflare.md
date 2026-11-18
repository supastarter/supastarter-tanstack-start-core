# 0001: Host TanStack Start with Nitro and the Cloudflare Vite plugin

- **Status:** Accepted
- **Date:** 2026-11-18

## Context

Generated projects from this core have to deploy to Vercel and to Cloudflare Workers. TanStack
Start keeps the application the same across hosts and selects a Vite plugin per target. Vercel
documents the Nitro plugin. Cloudflare documents `@cloudflare/vite-plugin`, which replaces Nitro
instead of running next to it. Local production and Playwright also need the Node server Nitro
emits.

## Decision

`vite build` uses Nitro. Locally and in CI it writes a Node server to `.output/`. On Vercel, Nitro
selects the Vercel preset because `VERCEL` is set. `DEPLOY_TARGET=cloudflare`
(`pnpm build:cloudflare`) uses `@cloudflare/vite-plugin` and `wrangler.jsonc` instead. Routes, the
oRPC handler and the UI do not change between those builds.

## Alternatives considered

Nitro can emit a Cloudflare worker too. That would be one plugin, but it is not the TanStack Start
integration Cloudflare supports, and it would skip the Workers Vite environment used for bindings
and `wrangler deploy`. A second copy of the app per host was rejected because the framework's
hosting model is a plugin swap.

## Consequences

Two build commands, one app. `pnpm verify` covers the Nitro build and the browser tests. CI also
builds the Workers output. `wrangler deploy` must not be passed `--config wrangler.jsonc`, or it
ignores the config the Vite plugin generates. Nitro 3, which provides `nitro/vite`, is still
published as a release candidate.
