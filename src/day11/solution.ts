import assert from "node:assert";

type EnergyGrid = number[][];

const NEIGHBORS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let GRID: EnergyGrid;
let FLASHES = 0;

const FLASHED = new Set<string>();

function init(grid: EnergyGrid) {
  FLASHED.clear();
  FLASHES = 0;
  GRID = grid;
}

function flash(y: number, x: number) {
  FLASHES += 1;
  for (const [deltaY, deltaX] of NEIGHBORS) {
    const neighborY = y + deltaY;
    const neighborX = x + deltaX;
    const neighborKey = `${neighborY}-${neighborX}`;

    if (!FLASHED.has(neighborKey) && isValidCell(neighborY, neighborX)) {
      GRID[neighborY][neighborX] += 1;
      if (GRID[neighborY][neighborX] > 9) {
        FLASHED.add(neighborKey);
        flash(neighborY, neighborX);
      }
    }
  }
}

function isValidCell(y: number, x: number) {
  return y > -1 && y < GRID.length && x > -1 && x < GRID[0]?.length;
}

function parseCellKey(cellKey: string) {
  const captures = cellKey.match(/(\d+)-(\d+)/);
  assert(captures?.[1] && captures?.[2], `Invalid cellKey: ${cellKey}`);
  return [captures[1], captures[2]].map(Number);
}

function resetFlashedCells() {
  for (let cellKey of FLASHED) {
    const [y, x] = parseCellKey(cellKey);
    GRID[y][x] = 0;
  }

  FLASHED.clear();
}

export function tick() {
  GRID.forEach((row, y) => {
    row.forEach((_, x) => {
      const cellKey = `${y}-${x}`;
      if (FLASHED.has(cellKey)) {
        return;
      }

      GRID[y][x] += 1;
      if (GRID[y][x] > 9) {
        FLASHED.add(cellKey);
        flash(y, x);
      }
    });
  });
}

export function solutionA(grid: EnergyGrid) {
  init(grid);

  let iterations = 100;
  while (iterations-- > 0) {
    tick();
    resetFlashedCells();
  }

  return FLASHES;
}

export function solutionB(grid: EnergyGrid) {
  init(grid);
  const totalCells = grid.length * (grid[0]?.length || 0);

  let iterations = 0;
  while (++iterations) {
    tick();
    if (FLASHED.size === totalCells) {
      return iterations;
    }
    resetFlashedCells();
  }
}
