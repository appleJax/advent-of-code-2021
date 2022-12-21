import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 10 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA([""])).toBe(0);
    expect(solutionA(["", ""])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA(["()"])).toBe(0);
    expect(solutionA(["[()<>]"])).toBe(0);
    expect(solutionA(["[)"])).toBe(3);
    expect(solutionA(["(]"])).toBe(57);
    expect(solutionA(["[}"])).toBe(1197);
    expect(solutionA(["[>"])).toBe(25137);
    expect(solutionA(["[}", "[}", "[>"])).toBe(1197 + 1197 + 25137);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(294195);
  });
});

describe("Day 10 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB([])).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionB([])).toBe(false);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(false);
  });
});
