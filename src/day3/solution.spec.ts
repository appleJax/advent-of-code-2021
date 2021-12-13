import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 3 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA(["0000"])).toBe(0);
    expect(solutionA(["1111"])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA(["1110"])).toBe(14);
    expect(solutionA(["0110"])).toBe(54);
  });

  test("multiple binary numbers", () => {
    expect(solutionA(["1110", "1001", "0000"])).toBe(56);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(42);
  });
});

describe("Day 3 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB([])).toBe(0);
  });

  xtest("simple case", () => {
    expect(solutionB([])).toBe(false);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(42);
  });
});
