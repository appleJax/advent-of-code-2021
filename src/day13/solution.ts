export function solutionA(input: string[]) {
  const { dots, folds } = parseInput(input);

  const firstFold = folds[0];
  const axis = Object.keys(firstFold)[0] as "x" | "y";
  const lineNum: number = Object.values(firstFold)[0];

  dots.forEach((dot) => {
    if (dot[axis] > lineNum) {
      const diff = dot[axis] - lineNum;
      dot[axis] = lineNum - diff;
    }
  });

  return new Set(dots.map((coord) => JSON.stringify(coord))).size;
}

export function solutionB(_input: string[]) {
  return 0;
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
