type DrawnIndexes = Record<number, number>;

export function solutionA(input: string) {
  const { boards, drawnIndexes, drawnNums } = parseInput(input);

  let minWinningIndex = Infinity;

  const winningIndex = getWinningIndex(drawnIndexes)(boards[0]);

  return 0;
}

export function solutionB(input: string) {
  return 0;
}

export function parseInput(input: string) {
  const parsed = input.split("\n\n");
  const drawnNums = parsed.shift()?.split(",").map(Number) as number[];
  const drawnIndexes = drawnNums.reduce<DrawnIndexes>((hashmap, num, index) => {
    hashmap[num] = index;
    return hashmap;
  }, {});

  const boards = parsed.map((rawBoard) =>
    rawBoard.split("\n").map((row) => row.trim().split(/\s+/).map(Number))
  );

  return {
    boards,
    drawnIndexes,
    drawnNums,
  };
}

export function getWinningIndex(drawnIndexes: DrawnIndexes) {
  return (board: number[][]) => {
    let winningIndex = Infinity;

    for (let i = 0; i < 5; i++) {
      const isWinningRow = board[i].every((num) => num in drawnIndexes);
      if (isWinningRow) {
        const maxIndex = board[i].reduce(
          (max, num) => (drawnIndexes[num] < max ? max : drawnIndexes[num]),
          -Infinity
        );
        winningIndex = Math.min(maxIndex, winningIndex);
      }

      const isWinningColumn = board.every((row) => row[i] in drawnIndexes);
      if (isWinningColumn) {
        const maxIndex = board.reduce(
          (max, row) =>
            drawnIndexes[row[i]] < max ? max : drawnIndexes[row[i]],
          -Infinity
        );
        winningIndex = Math.min(maxIndex, winningIndex);
      }
    }

    return winningIndex;
  };
}

type GetScoreArgs = {
  board: number[][];
  drawnIndexes: DrawnIndexes;
  winningIndex: number;
};

export function getScore({ board, drawnIndexes, winningIndex }: GetScoreArgs) {
  return 42;
}
