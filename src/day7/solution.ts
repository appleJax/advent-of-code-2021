export function solutionA(input: number[]) {
  input.sort((a, b) => a - b);
  const target = input[Math.floor(input.length / 2)];

  return input.reduce(
    (totalFuel, position) => totalFuel + Math.abs(position - target),
    0
  );
}

function getFuel(moves: number) {
  return Array(moves)
    .fill(undefined)
    .reduce((sum, _, i) => sum + i + 1, 0);
}

// needed since 0 is a valid position but is the identity element for addition
const OFFSET = 1;

export function solutionB(input: number[]) {
  const uniqueNums = new Set(input).size;
  if (uniqueNums < 2) {
    return 0;
  }
  const average = input.reduce((sum, x) => sum + x + OFFSET, 0) / input.length;
  const targetLo = Math.floor(average);
  const targetHi = Math.ceil(average);

  const left = input.reduce(
    (totalFuel, position) =>
      totalFuel + getFuel(Math.abs(position + OFFSET - targetLo)),
    0
  );

  if (targetLo === targetHi) {
    return left;
  }

  const right = input.reduce(
    (totalFuel, position) =>
      totalFuel + getFuel(Math.abs(position + OFFSET - targetHi)),
    0
  );

  return Math.min(left, right);
}
