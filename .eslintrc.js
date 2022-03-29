module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // global: {
  //   defineEmits: true,
  //   document: true,
  //   localStorage: true,
  //   GLOBAL_VAR: true,
  //   window: true,
  //   defineProps: true,
  //   defineExpose: true
  // },
  extends: [
    "./.eslintrc-auto-import.json",
    "airbnb-base",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "import", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
