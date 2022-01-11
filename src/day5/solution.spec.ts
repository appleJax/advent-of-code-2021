import path from "path";
import fs from "fs";
import { buildGrid, countOverlap, parseInput, solution } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

/*
 *  Representation of parsedInput
 *
 *  [
 *    [0,0,0,0,0,0,0,0,0],
 *    [1,0,0,0,0,0,0,0,0],
 *    [1,0,0,0,0,0,0,0,0],
 *    [1,0,0,0,0,0,0,0,0],
 *    [0,0,2,1,1,2,0,0,0],
 *    [0,0,1,0,1,0,0,0,0],
 *    [0,0,1,1,0,0,0,0,0],
 *    [0,0,1,0,0,0,0,0,0],
 *    [0,0,1,1,1,0,0,0,0],
 *  ]
 */

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
    [2, 6],
    [2, 4],
  ],
  [
    [2, 7],
    [5, 4],
  ],
];

const rawInput = [
  "2,4 -> 5,4",
  "4,8 -> 2,8",
  "0,1 -> 0,3",
  "2,6 -> 2,4",
  "2,7 -> 5,4",
];

describe("helpers", () => {
  test("parseInput", () => {
    expect(parseInput(rawInput)).toEqual(parsedInput);
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
    grid[4][2] = 2;
    grid[5][2] = 1;
    grid[6][2] = 1;

    expect(buildGrid()(parsedInput.slice(0, -1))).toEqual(grid);
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
  test("degenerate case", () => {
    expect(solution([])).toBe(0);
  });

  test("simple case", () => {
    expect(solution(rawInput)).toBe(1);
  });

  test("Official Solution - Part 1", () => {
    expect(solution(officialInput)).toBe(5774);
  });
});

describe("Day 5 - Part 2", () => {
  test("degenerate case", () => {
    expect(solution([], { countDiagonals: true })).toBe(0);
  });

  test("simple case", () => {
    expect(solution(rawInput, { countDiagonals: true })).toBe(2);
  });

  test("Official Solution - Part 2", () => {
    expect(solution(officialInput, { countDiagonals: true })).toBe(18423);
  });
});
