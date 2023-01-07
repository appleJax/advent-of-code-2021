import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 13 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
  });

  test("simple case", () => {
    expect(
      solutionA([
        "6,10",
        "0,14",
        "9,10",
        "0,3",
        "10,4",
        "4,11",
        "6,0",
        "6,12",
        "4,1",
        "0,13",
        "10,12",
        "3,4",
        "3,0",
        "8,4",
        "1,10",
        "2,14",
        "8,10",
        "9,0",
        "",
        "fold along y=7",
        "fold along x=5",
      ])
    ).toBe(17);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(753);
  });
});

describe("Day 13 - Part 2", () => {
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
