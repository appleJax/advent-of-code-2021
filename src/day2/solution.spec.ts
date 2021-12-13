import path from "path";
import fs from "fs";
import { parseCommand, solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("parseCommand", () => {
  test("invalid command", () => {
    expect(() => parseCommand("back 20")).toThrow(
      new Error("Invalid command: back 20")
    );
  });

  test("down command", () => {
    expect(parseCommand("down 20")).toEqual({ x: 0, y: 20 });
  });

  test("up command", () => {
    expect(parseCommand("up 20")).toEqual({ x: 0, y: -20 });
  });

  test("forward command", () => {
    expect(parseCommand("forward 20")).toEqual({ x: 20, y: 0 });
  });
});

describe("Day 2 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA(["forward 0", "down 20"])).toBe(0);
    expect(solutionA(["forward 10", "down 0"])).toBe(0);
    expect(solutionA(["down 10", "up 10"])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA(["forward 2", "down 5"])).toBe(10);
    expect(solutionA(["forward 5", "down 2"])).toBe(10);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(1947824);
  });
});

describe("Day 2 - Part 2", () => {
  test("degenerate case", () => {
    expect(solutionB([])).toBe(0);
    expect(solutionB(["down 20", "forward 0"])).toBe(0);
    expect(solutionB(["down 0", "forward 10"])).toBe(0);
    expect(solutionB(["down 10", "up 10", "forward 10"])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionB(["down 7", "up 2", "forward 10"])).toBe(500);
  });

  test("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(1813062561);
  });
});
