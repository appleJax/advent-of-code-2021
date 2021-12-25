import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 4 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionA([])).toBe();
  });

  xtest("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(42);
  });
});

describe("Day 4 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB([])).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionB([])).toBe(false);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(42);
  });
});

