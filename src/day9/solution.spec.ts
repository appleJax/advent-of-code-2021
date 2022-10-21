import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split("").map(Number));

describe("Day 9 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([[]])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA([[0]])).toBe(1);
    expect(solutionA([[2]])).toBe(3);
    expect(
      solutionA([
        [2, 3],
        [1, 4],
      ])
    ).toBe(2);
  });

  test("complex case", () => {
    expect(
      solutionA([
        [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
        [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
        [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
        [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
        [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
      ])
    ).toBe(15);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(498);
  });
});

describe("Day 9 - Part 2", () => {
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
