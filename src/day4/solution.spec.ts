import path from "path";
import fs from "fs";
import {
  getScore,
  winningIndexFactory,
  parseInput,
  solution,
  getOverallWinner,
} from "./solution";

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

  test("winningIndexFactory - row", () => {
    const drawnIndexes = {
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    };
    expect(winningIndexFactory(drawnIndexes)(mockBoard)).toEqual(50);
  });

  test("winningIndexFactory - column", () => {
    const drawnIndexes = {
      1: 10,
      6: 60,
      11: 110,
      16: 160,
      21: 210,
    };
    expect(winningIndexFactory(drawnIndexes)(mockBoard)).toEqual(210);
  });

  test("winningIndexFactory - not a winner", () => {
    const drawnIndexes = {
      1: 0,
      2: 1,
      3: 2,
      4: 3,
      100: 4,
    };
    expect(winningIndexFactory(drawnIndexes)(mockBoard)).toEqual(Infinity);
  });

  test("getOverallWinner - degenerate case", () => {
    expect(getOverallWinner([])).toEqual({
      winningIndex: Infinity,
      winningBoardIndex: Infinity,
    });
  });

  test("getOverallWinner", () => {
    expect(getOverallWinner([100, 300, 50, 200])).toEqual({
      winningIndex: 50,
      winningBoardIndex: 2,
    });
  });

  test("getOverallWinner - last", () => {
    expect(getOverallWinner([100, 300, 50, 200], { winner: "LAST" })).toEqual({
      winningIndex: 300,
      winningBoardIndex: 1,
    });
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
    const drawnNums = [21, 22, 23, 24, 25];

    expect(
      getScore({
        board: mockBoard,
        drawnIndexes,
        drawnNums,
        winningIndex: 4,
      })
    ).toEqual(210 * 25);
  });
});

describe("Day 4 - Part 1", () => {
  test("degenerate case", () => {
    expect(solution("")).toBe(0);

    const noWinner = `1,2,3,4,100

 1  2  3  4  5
 6  7  8  9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25`;

    expect(solution(noWinner)).toBe(0);
  });

  test("simple case", () => {
    const input = `21,22,23,24,25

 1  2  3  4  5
 6  7  8  9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25`;

    expect(solution(input)).toBe(210 * 25);
  });

  test("Official Solution - Part 1", () => {
    expect(solution(officialInput)).toBe(49860);
  });
});

describe("Day 4 - Part 2", () => {
  test("Official Solution - Part 2", () => {
    expect(solution(officialInput, { winner: "LAST" })).toBe(24628);
  });
});
