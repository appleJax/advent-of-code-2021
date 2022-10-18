import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split(",")
  .map(Number);

describe("Day 7 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA([12])).toBe(0);
    expect(solutionA([7, 7, 7])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA([1, 2, 5])).toBe(4);
    expect(solutionA([1, 2, 5, 9])).toBe(11);
    expect(solutionA([1, 2, 5, 9, 22])).toBe(28);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(339321);
  });
});

describe("Day 7 - Part 2", () => {
  test("degenerate case", () => {
    expect(solutionB([])).toBe(0);
    expect(solutionB([12])).toBe(0);
    expect(solutionB([7, 7, 7])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionB([1, 2, 5])).toBe(7);
    expect(solutionB([1, 2, 5, 9])).toBe(25);
    expect(solutionB([0, 1, 1, 0, 2, 5, 9])).toBe(42);
    expect(solutionB([1, 2, 5, 9, 22])).toBe(161);
  });

  test("complex case", () => {
    expect(solutionB([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])).toBe(168);
  });

  test("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(95476244);
  });
});
