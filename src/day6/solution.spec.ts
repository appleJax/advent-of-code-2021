import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 6 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([], 5)).toBe(0);
  });

  xtest("simple case", () => {
    expect(solutionA([], 1)).toBe(false);
  });

  xtest("Official Solution - Part 1", () => {
    expect(solutionA(officialInput, 5)).toBe(42);
  });
});

describe("Day 6 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB([], 0)).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionB([], 1)).toBe(false);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput, 5)).toBe(42);
  });
});
