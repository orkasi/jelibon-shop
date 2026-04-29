import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**"],
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react/display-name": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];
