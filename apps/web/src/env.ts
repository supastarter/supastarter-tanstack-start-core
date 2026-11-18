import { createEnv } from "@t3-oss/env-core";

/**
 * Typed, validated environment variables. Declare every variable here (`server` for
 * server-only ones, `client` for `VITE_` ones) and read them from `env`, never from
 * `process.env` or `import.meta.env`. Also list them in `.env.example`.
 *
 * Pass each client variable through `runtimeEnv` from `import.meta.env` so Vite can
 * inline it. Do not spread `process.env` into client code.
 */
export const env = createEnv({
  server: {},
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
