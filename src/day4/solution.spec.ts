import path from "path";
import fs from "fs";
import { getScore, getWinningIndex, parseInput, solutionA, solutionB } from "./solution";

const officialInput = fs.readFileSync(
  path.resolve(__dirname, "input.txt"),
  "utf-8"
);

const mockBoard = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

describe("helpers", () => {
  test("parseInput", () => {
    const { boards, drawnIndexes, drawnNums } = parseInput(officialInput);

    const firstBoard = boards[0];
    expect(firstBoard).toHaveLength(5);
    expect(firstBoard[0]).toEqual([95, 91, 54, 75, 45]);

    expect(drawnNums[drawnNums.length - 1]).toEqual(60);
    expect(drawnNums.slice(0, 3)).toEqual([31, 50, 68]);

    expect(drawnIndexes[31]).toEqual(0);
    expect(drawnIndexes[50]).toEqual(1);
    expect(drawnIndexes[60]).toEqual(99);
  });

  test("getWinningIndex - row", () => {
    const drawnIndexes = {
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    };
    expect(getWinningIndex(drawnIndexes)(mockBoard)).toEqual(50);
  });

  test("getWinningIndex - column", () => {
    const drawnIndexes = {
      1: 10,
      6: 60,
      11: 110,
      16: 160,
      21: 210,
    };
    expect(getWinningIndex(drawnIndexes)(mockBoard)).toEqual(210);
  });

  test("getScore", () => {
    const drawnIndexes = {
      21: 0,
      22: 1,
      23: 2,
      24: 3,
      25: 4,
      10: 5,
      11: 6,
    };
    expect(getScore({
      board: mockBoard,
      drawnIndexes,
      winningIndex: 4,
    })).toEqual(210 * 25);
  });
});

describe("Day 4 - Part 1", () => {
  xtest("degenerate case", () => {
    expect(solutionA("")).toBe(0);
  });

  xtest("simple case", () => {
    const input = `21,22,23,24,25

 1  2  3  4  5
 6  7  8  9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25`;

    expect(solutionA(input)).toBe(210 * 25);
  });

  xtest("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(42);
  });
});

describe("Day 4 - Part 2", () => {
  xtest("degenerate case", () => {
    expect(solutionB("")).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionB("")).toBe(false);
  });

  xtest("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(42);
  });
});
