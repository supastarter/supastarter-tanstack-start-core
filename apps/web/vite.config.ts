import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";

import "./src/env.ts";

// Nitro serves Node (local production, Docker) and Vercel, which selects its preset when VERCEL
// is set. Cloudflare Workers uses its own Vite plugin, so the two are never enabled together.
const deployToCloudflare = process.env.DEPLOY_TARGET === "cloudflare";

const hostingPlugins: PluginOption[] = deployToCloudflare
  ? [cloudflare({ viteEnvironment: { name: "ssr" } })]
  : [nitro()];

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    ...(deployToCloudflare ? hostingPlugins : []),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    ...(deployToCloudflare ? [] : hostingPlugins),
  ],
});
