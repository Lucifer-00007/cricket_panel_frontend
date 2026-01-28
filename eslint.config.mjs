import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "out/**",
      ".out/**",
      "node_modules/**",
      "dist/**",
      "build/**"
    ]
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off"
    }
  }
);