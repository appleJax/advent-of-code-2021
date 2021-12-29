type DrawnIndexes = Record<number, number>;

export function solutionA(input: string) {
  const { boards, drawnIndexes, drawnNums } = parseInput(input);
  const getWinningIndex = winningIndexFactory(drawnIndexes);

  try {
    const winningIndexes = boards.map(getWinningIndex);
    const { winningIndex, winningBoardIndex } =
      getOverallWinner(winningIndexes);

    if (winningIndex === Infinity) {
      return 0;
    }

    return getScore({
      board: boards[winningBoardIndex],
      drawnIndexes,
      drawnNums,
      winningIndex,
    });
  } catch {
    return 0;
  }
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

export function winningIndexFactory(drawnIndexes: DrawnIndexes) {
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
  drawnNums: number[];
  winningIndex: number;
};

export function getScore({
  board,
  drawnIndexes,
  drawnNums,
  winningIndex,
}: GetScoreArgs) {
  const sumOfUndrawnNums = board.reduce((score, row) => {
    const rowSum = row.reduce(
      (sum, num) => (drawnIndexes[num] <= winningIndex ? sum : sum + num),
      0
    );
    return score + rowSum;
  }, 0);

  return sumOfUndrawnNums * drawnNums[winningIndex];
}

export function getOverallWinner(winningIndexes: number[]) {
  return winningIndexes.reduce(
    (result, boardWinningIndex, index) => {
      if (boardWinningIndex < result.winningIndex) {
        return {
          winningIndex: boardWinningIndex,
          winningBoardIndex: index,
        };
      }
      return result;
    },
    { winningIndex: Infinity, winningBoardIndex: Infinity }
  );
}
