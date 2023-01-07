export function solutionA(input: string[]) {
  const { dots, folds } = parseInput(input);
  dots.forEach((dot) => foldDot(dot, folds[0]));
  return new Set(dots.map((coord) => JSON.stringify(coord))).size;
}

export function solutionB(input: string[]) {
  const { dots, folds } = parseInput(input);
  folds.forEach((fold) => {
    dots.forEach((dot) => foldDot(dot, fold));
  });

  return printDots(dots);
}

type Coord = {
  x: number;
  y: number;
};

type HorizontalFold = {
  y: number;
};

type VerticalFold = {
  x: number;
};

type Fold = HorizontalFold | VerticalFold;

type PuzzleData = {
  dots: Coord[];
  folds: Fold[];
};

function parseInput(input: string[]) {
  return input.reduce<PuzzleData>(
    (puzzleData, line) => {
      if (/\d+,\d+/.test(line)) {
        puzzleData.dots.push(parseCoord(line));
      }

      if (/fold along/.test(line)) {
        puzzleData.folds.push(parseFold(line));
      }

      return puzzleData;
    },
    {
      dots: [],
      folds: [],
    }
  );
}

function parseCoord(line: string): Coord {
  const [x, y] = line.split(",").map(Number);
  return { x, y };
}

function parseFold(line: string): Fold {
  const [_, axis, lineNum] = line.match(/(x|y)=(\d+)/) || [];
  return {
    [axis]: Number(lineNum),
  } as unknown as Fold;
}

function foldDot(dot: Coord, fold: Fold) {
  const axis = Object.keys(fold)[0] as "x" | "y";
  const lineNum: number = Object.values(fold)[0];

  if (dot[axis] > lineNum) {
    const diff = dot[axis] - lineNum;
    dot[axis] = lineNum - diff;
  }
}

function printDots(dots: Coord[]) {
  const size = getPaperSize(dots);
  const printOut = Array(size.y + 1)
    .fill(null)
    .map((_) => Array(size.x + 1).fill("."));
  dots.forEach(({ x, y }) => (printOut[y][x] = "#"));

  return printOut.map((line) => line.join("")).join("\n");
}

function getPaperSize(dots: Coord[]) {
  return dots.reduce<Coord>(
    (size, dot) => ({
      x: Math.max(size.x, dot.x),
      y: Math.max(size.y, dot.y),
    }),
    { x: 0, y: 0 }
  );
}
