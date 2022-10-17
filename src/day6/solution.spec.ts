import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split(",")
  .map(Number);

describe("Day 6 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([], 5)).toBe(0);
    expect(solutionA([0, 0, 1], 0)).toBe(3);
  });

  test("simple case", () => {
    expect(solutionA([1], 1)).toBe(1);
    expect(solutionA([0], 1)).toBe(2);
    expect(solutionA([0], 7)).toBe(2);
    expect(solutionA([0], 8)).toBe(3);
    expect(solutionA([0], 9)).toBe(3);
    expect(solutionA([0], 10)).toBe(4);
  });

  test("complex case", () => {
    expect(solutionA([1, 0, 5], 1)).toBe(4);
    expect(solutionA([0, 2, 6], 4)).toBe(5);
    expect(solutionA([0, 2], 11)).toBe(7);
  });

  test("Official solutionA - Part 1", () => {
    expect(solutionA(officialInput, 80)).toBe(377263);
  });
});

describe("Day 6 - Part 2", () => {
  test("degenerate case", () => {
    expect(solutionB([], 5)).toBe(0);
    expect(solutionB([0, 0, 1], 0)).toBe(3);
  });

  test("simple case", () => {
    expect(solutionB([1], 1)).toBe(1);
    expect(solutionB([0], 1)).toBe(2);
    expect(solutionB([0], 7)).toBe(2);
    expect(solutionB([0], 8)).toBe(3);
    expect(solutionB([0], 9)).toBe(3);
    expect(solutionB([0], 10)).toBe(4);
  });

  test("complex case", () => {
    expect(solutionB([1, 0, 5], 1)).toBe(4);
    expect(solutionB([0, 2, 6], 4)).toBe(5);
    expect(solutionB([0, 2], 11)).toBe(7);
  });

  test("Official solutionB - Part 2", () => {
    expect(solutionB(officialInput, 256)).toBe(1695929023803);
  });
});
