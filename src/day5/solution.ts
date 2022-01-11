const pipe =
  (...fns: ((...args: any[]) => unknown)[]) =>
  (initialArg: unknown) =>
    fns.reduce((res, fn) => fn(res), initialArg);

export function solution(input: string[], { countDiagonals = false } = {}) {
  const calcAnswer = pipe(
    parseInput,
    buildGrid({ countDiagonals }),
    countOverlap
  );
  return calcAnswer(input);
}

export function parseInput(input: string[]) {
  return input.map((str) =>
    str.split(" -> ").map((strCoords) => strCoords.split(",").map(Number))
  );
}

type Axis = "horizontal" | "vertical";

export function buildGrid({ countDiagonals = false } = {}) {
  return (input: number[][][]) => {
    let grid: number[][] = [];

    for (let [[x, y], [w, q]] of input) {
      const args = { x, y, w, q, grid };
      if (x === w || y === q) {
        addNonDiagonalCells(args);
      } else if (countDiagonals) {
        addDiagonalCells(args);
      }
    }

    return grid;
  };
}

type AppendGridArgs = {
  x: number;
  y: number;
  w: number;
  q: number;
  grid: number[][];
};

function addNonDiagonalCells({ x, y, w, q, grid }: AppendGridArgs) {
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

function addDiagonalCells({ x, y, w, q, grid }: AppendGridArgs) {
  let pointA = { x, y };
  let pointB = { x: w, y: q };

  if (Math.min(x, w) === w) {
    [pointA, pointB] = [pointB, pointA];
  }

  let xIndex = pointA.x;
  let yIndex = pointA.y;
  const yDiff = pointA.y < pointB.y ? 1 : -1;

  while (xIndex <= pointB.x) {
    if (!grid[yIndex]) {
      grid[yIndex] = [];
    }
    grid[yIndex][xIndex] = (grid[yIndex][xIndex] || 0) + 1;
    xIndex++;
    yIndex += yDiff;
  }
}

export function countOverlap(grid: number[][]) {
  return grid.reduce(
    (result, row) => result + row.filter((cell) => cell > 1).length,
    0
  );
}
