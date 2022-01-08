import path from "path";
import fs from "fs";
import {
  buildGrid,
  countOverlap,
  filterInput,
  parseInput,
  solutionA,
  solutionB,
} from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

const parsedInput = [
  [
    [2, 4],
    [5, 4],
  ],
  [
    [4, 8],
    [2, 8],
  ],
  [
    [0, 1],
    [0, 3],
  ],
  [
    [2, 7],
    [2, 5],
  ],
  [
    [2, 7],
    [5, 3],
  ],
];

describe("helpers", () => {
  test("parseInput", () => {
    const input = [
      "2,4 -> 5,4",
      "4,8 -> 2,8",
      "0,1 -> 0,3",
      "2,7 -> 2,5",
      "2,7 -> 5,3",
    ];

    expect(parseInput(input)).toEqual(parsedInput);
  });

  test("filterInput - filters out diagonal lines", () => {
    expect(filterInput(parsedInput)).toEqual(parsedInput.slice(0, -1));
  });

  test("buildGrid", () => {
    const grid: number[][] = [];

    grid[4] = [];
    grid[4][2] = 1;
    grid[4][3] = 1;
    grid[4][4] = 1;
    grid[4][5] = 1;

    grid[8] = [];
    grid[8][2] = 1;
    grid[8][3] = 1;
    grid[8][4] = 1;

    grid[1] = [];
    grid[2] = [];
    grid[3] = [];
    grid[1][0] = 1;
    grid[2][0] = 1;
    grid[3][0] = 1;

    grid[5] = [];
    grid[6] = [];
    grid[7] = [];
    grid[5][2] = 1;
    grid[6][2] = 1;
    grid[7][2] = 1;

    expect(buildGrid(parsedInput.slice(0, -1))).toEqual(grid);
  });

  test("countOverlap", () => {
    const grid: number[][] = [];
    grid[0] = [];
    grid[5] = [];
    grid[7] = [];

    grid[0][1] = -3;
    grid[0][2] = 0;
    grid[0][3] = 1;
    grid[5][8] = 2;
    grid[7][8] = 8;

    expect(countOverlap(grid)).toEqual(2);
  });
});

describe("Day 5 - Part 1", () => {
  xtest("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA([])).toBe(0);
  });

  xtest("simple case", () => {
    expect(solutionA([])).toBe(0);
  });

  xtest("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(42);
  });
});

describe("Day 5 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB([])).toBe(0);
  });

  xtest("simple case", () => {
    expect(solutionB([])).toBe(0);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(42);
  });
});
