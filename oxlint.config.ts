import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import playwright from "ultracite/oxlint/playwright";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  env: core.env,
  extends: [core, next, vitest, playwright],
  ignorePatterns: [
    ...core.ignorePatterns,
    ".agents/skills/migrate-radix-to-base/**",
    ".agents/skills/shadcn/**",
  ],
  options: { typeAware: true },
});
