module.exports = {
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  ignorePatterns: [
    "**/*.ico",
    "**/*.svg",
    "**/*.lock",
    "**/*.log",
    "**/*.json",
    "**/*.md",
    "**/*.mp4",
    "**/*.txt",
    "**/*.yaml",
    "**/*.sh",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  extends: ["eslint:recommended", "prettier"],
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
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};
