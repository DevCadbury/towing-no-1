import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Flat config for ESLint 10 / Next 16 (`next lint` was removed in Next 16 and
// ESLint 10 does not read .eslintrc.json). Uses only the installed
// eslint-config-next presets.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next sets react.version "detect"; eslint-plugin-react's
    // detection calls context.getFilename(), which ESLint 10 removed
    // ("Error while loading rule 'react/display-name'"). Pin the installed
    // React major.minor (package.json "react": "19.2.4") so detection is skipped.
    settings: { react: { version: "19.2" } },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "reports/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
