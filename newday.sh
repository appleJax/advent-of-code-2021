#! /bin/bash

RE='^[0-9]+$';
if ! [[ $1 =~ $RE ]] ; then
  echo "Argument Error: expected a number";
  echo "To create a Day3 directory: ./newday.sh 3";
  exit 1;
fi

NEWDIR="src/day$1";
mkdir $NEWDIR;

touch "${NEWDIR}/README.md";
touch "${NEWDIR}/input.txt";

cat > "${NEWDIR}/solution.ts" <<- EOM
export function solutionA(input: unknown[]) {
  return input;
}

export function solutionB(input: unknown[]) {
  return input;
}

EOM

cat > "${NEWDIR}/solution.spec.ts" <<- EOM
import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day $1 - Part 1", () => {
  test("degenerate case", () => {
    expect(solutionA([])).toBe(false);
  });

  xtest("simple case", () => {
    expect(solutionA([])).toBe(false);
  });

  xtest("Official Solution - Part 1", () => {
    expect(solutionA(officialInput)).toBe(false);
  });
});

describe("Day $1 - Part 2", () => {
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

EOM
