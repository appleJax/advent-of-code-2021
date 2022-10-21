const DELTAS = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function getHeight(heightMap: number[][], y: number, x: number) {
  if (y < 0 || y >= heightMap.length || x < 0 || x >= heightMap[0].length) {
    return Infinity;
  }
  return heightMap[y][x];
}

export function solutionA(heightMap: number[][]) {
  return heightMap.reduce((riskLevelSum, row, y) => {
    row.forEach((height, x) => {
      const isLowPoint = DELTAS.every(
        ([deltaY, deltaX]) =>
          height < getHeight(heightMap, y + deltaY, x + deltaX)
      );
      if (isLowPoint) {
        riskLevelSum += height + 1;
      }
    });

    return riskLevelSum;
  }, 0);
}

export function solutionB(input: unknown[]) {
  return input;
}
