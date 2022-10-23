type HeightMap = number[][];

type Coord = [number, number];

const DELTAS = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
] as const;

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

export function getBasinSize(
  heightMap: HeightMap,
  countedCoords: Set<string>,
  y: number,
  x: number
) {
  const queue: Coord[] = [[y, x]];

  let currentCoord = queue.shift();
  let size = 1;

  while (currentCoord) {
    const [currentY, currentX] = currentCoord;

    SEARCH_NEIGHBORS: for (const [deltaY, deltaX] of DELTAS) {
      const neighborY = currentY + deltaY;
      const neighborX = currentX + deltaX;
      const coordKey = `${neighborY}-${neighborX}`;

      if (countedCoords.has(coordKey)) {
        continue SEARCH_NEIGHBORS;
      }

      const neighbor = getHeight(heightMap, neighborY, neighborX);

      if (neighbor > heightMap[currentY][currentX] && neighbor < 9) {
        size++;
        countedCoords.add(coordKey);
        queue.push([neighborY, neighborX]);
      }
    }

    currentCoord = queue.shift();
  }

  return size;
}

export function solutionB(heightMap: HeightMap) {
  const countedCoords = new Set<string>();

  const biggestBasins = heightMap.reduce<number[]>((biggestThree, row, y) => {
    row.forEach((height, x) => {
      if (isLowPoint(height, heightMap, y, x)) {
        const basinSize = getBasinSize(heightMap, countedCoords, y, x);
        biggestThree = [...biggestThree, basinSize]
          .sort((a, b) => b - a)
          .slice(0, 3);
      }
    });

    return biggestThree;
  }, []);

  if (biggestBasins.length) {
    return biggestBasins.reduce((product, basinSize) => product * basinSize, 1);
  }

  return 0;
}
