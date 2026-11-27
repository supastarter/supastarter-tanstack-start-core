import { defineConfig } from "oxlint";
import react from "ultracite/oxlint/react";

import root from "../../oxlint.config.ts";

export default defineConfig({
  env: root.env,
  extends: [root, react],
  ignorePatterns: root.ignorePatterns,
});
