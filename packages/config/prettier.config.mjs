/** @type {import("prettier").Config} */
const config = {
  printWidth: 90,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
