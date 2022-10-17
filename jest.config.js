module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.jest.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
};
