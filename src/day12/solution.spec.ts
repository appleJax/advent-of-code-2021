import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 12 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
  });

  test("simple case", () => {
    expect(
      solutionA(["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"])
    ).toBe(10);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(4104);
  });
});

describe("Day 12 - Part 2", () => {
  test("degenerate case", () => {
    expect(solutionB([])).toBe(0);
  });

  test("simple case", () => {
    expect(
      solutionB(["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"])
    ).toBe(36);
  });

  test("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(119760);
  });
});
