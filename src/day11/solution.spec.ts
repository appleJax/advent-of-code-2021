import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split("").map(Number));

describe("Day 11 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toEqual(0);
    expect(solutionA([[], []])).toEqual(0);
  });

  test("simple case", () => {
    expect(
      solutionA([
        [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
        [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
        [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
        [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
        [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
        [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
        [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
        [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
        [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
        [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
      ])
    ).toBe(1656);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(1659);
  });
});

describe("Day 11 - Part 2", () => {
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
