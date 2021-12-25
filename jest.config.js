module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
};
