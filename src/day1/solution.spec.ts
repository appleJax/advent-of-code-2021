import path from "path";
import fs from "fs";
import solution from "./solution";

const input = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 1", () => {
  test("Sonar Sweep", () => {
    expect(solution(input)).toBe(true);
  });
});
