import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map(Number);

describe("Day 1 - Part 1", () => {
  test("empty array", () => {
    expect(solutionA([])).toBe(0);
  });

  test("no increase", () => {
    expect(solutionA([5, 4, 3, 2, 2, 1])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA([1, 2, 3, 2, 3, 4, 1])).toBe(4);
  });

  test("Sonar Sweep - Part 1", () => {
    expect(solutionA(officialInput)).toBe(1215);
  });
});

describe("Day 1 - Part 2", () => {
  test("not enough data", () => {
    expect(solutionB([])).toBe(0);
    expect(solutionB([100, 101, 102])).toBe(0);
  });

  test("no increase", () => {
    expect(solutionB([100, 90, 130, 95, 85, 120])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionB([100, 90, 130, 95, 95, 120, 100, 97, 70])).toBe(3);
  });

  test("Sonar Sweep - Part 2", () => {
    expect(solutionB(officialInput)).toBe(1150);
  });
});
