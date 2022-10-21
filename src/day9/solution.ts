type HeightMap = number[][];

const DELTAS = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function isLowPoint(
  height: number,
  heightMap: HeightMap,
  y: number,
  x: number
) {
  return DELTAS.every(
    ([deltaY, deltaX]) => height < getHeight(heightMap, y + deltaY, x + deltaX)
  );
}

function getHeight(heightMap: HeightMap, y: number, x: number) {
  if (y < 0 || y >= heightMap.length || x < 0 || x >= heightMap[0].length) {
    return Infinity;
  }
  return heightMap[y][x];
}

export function solutionA(heightMap: HeightMap) {
  return heightMap.reduce((riskLevelSum, row, y) => {
    row.forEach((height, x) => {
      if (isLowPoint(height, heightMap, y, x)) {
        riskLevelSum += height + 1;
      }
    });

    return riskLevelSum;
  }, 0);
}

export function solutionB(input: unknown[]) {
  return input;
}
