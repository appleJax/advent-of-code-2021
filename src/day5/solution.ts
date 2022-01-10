const pipe =
  (...fns: ((...args: any[]) => unknown)[]) =>
  (initialArg: unknown) =>
    fns.reduce((res, f) => f(res), initialArg);

export function solutionA(input: string[]) {
  const calcAnswer = pipe(parseInput, filterInput, buildGrid, countOverlap);
  return calcAnswer(input);
}

export function solutionB(input: string[]) {
  return 2;
}

export function parseInput(input: string[]) {
  return input.map((str) =>
    str.split(" -> ").map((strCoords) => strCoords.split(",").map(Number))
  );
}

export function filterInput(input: number[][][]) {
  return input.filter(
    (row) => row[0][0] === row[1][0] || row[0][1] === row[1][1]
  );
}

type Axis = "horizontal" | "vertical";

export function buildGrid(input: number[][][]) {
  const grid: number[][] = [];

  for (let [[x, y], [w, q]] of input) {
    let min = Math.min(x, w);
    let max = Math.max(x, w);
    let constant = y;
    let dir: Axis = "horizontal";

    if (x === w) {
      min = Math.min(y, q);
      max = Math.max(y, q);
      constant = x;
      dir = "vertical";
    }

    for (let i = min; i <= max; i++) {
      if (dir === "horizontal") {
        if (!grid[constant]) {
          grid[constant] = [];
        }
        grid[constant][i] = (grid[constant][i] || 0) + 1;
      } else {
        if (!grid[i]) {
          grid[i] = [];
        }
        grid[i][constant] = (grid[i][constant] || 0) + 1;
      }
    }
  }

  return grid;
}

export function countOverlap(grid: number[][]) {
  return grid.reduce(
    (result, row) => result + row.filter((cell) => cell > 1).length,
    0
  );
}
