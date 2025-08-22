import { baseConfig } from "@gramypomagamy/eslint-config";

export default [
  ...baseConfig,
  {
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
];
