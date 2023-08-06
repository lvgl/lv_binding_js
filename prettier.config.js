/** @type {import("prettier").Options} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'all',
  semi: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
