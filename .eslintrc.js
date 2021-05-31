module.exports = {
  env: {
    browser: true,
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
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:jest-dom/recommended",
    "plugin:cypress/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "@typescript-eslint", "jest-dom"],
  rules: {
    "react/jsx-props-no-spreading": "off",
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": "off",
    "import/extensions": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "cypress/support/commands.js",
          "jest-setup.ts",
          "**/*.test.ts",
          "**/*.spec.ts",
          "**/*.test.tsx",
          "**/*.spec.tsx",
        ],
      },
    ],
  },
};
