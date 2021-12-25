import path from "path";
import fs from "fs";
import { getRating, solutionA, solutionB } from "./solution";
import { Node } from "./Node";

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
    expect(solutionA(officialInput)).toBe(2003336);
  });
});

describe("Day 3 - Part 2", () => {
  test("ratings", () => {
    const tree = new Node("root");
    tree.insert("100");
    tree.insert("101");
    tree.insert("011");

    expect(getRating(tree, "OXYGEN_GENERATOR")).toEqual(5);
    expect(getRating(tree, "CO2_SCRUBBER")).toEqual(3);
  });

  test("degenerate case", () => {
    expect(solutionB([])).toBe(0);
    expect(solutionB(["010"])).toBe(4);
  });

  test("simple case", () => {
    expect(solutionB(["100", "101", "011"])).toBe(15);
    expect(solutionB(["100", "101", "011", "001"])).toBe(5);
    expect(solutionB(["100", "101", "011", "001", "110", "010"])).toBe(5);
  });

  test("Official Solution - Part 2", () => {
    expect(solutionB(officialInput)).toBe(1877139);
  });
});
