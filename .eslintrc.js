module.exports = {
  env: {
    es2021: true,
    jest: true,
  },
  ignorePatterns: [
    "**/*.ico",
    "**/*.svg",
    "yarn.lock",
    "**/*.log",
    "**/*.json",
    "**/*.css",
    "**/*.md",
    "**/*.mp4",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  extends: ["airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["jest-setup.ts", "**/*.test.ts", "**/*.spec.ts"],
      },
    ],
  },
};
