import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import playwright from "ultracite/oxlint/playwright";
import tanstack from "ultracite/oxlint/tanstack";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  env: core.env,
  extends: [core, tanstack, vitest, playwright],
  ignorePatterns: [...core.ignorePatterns, ".agents/skills/shadcn/**"],
  options: { typeAware: true },
});
