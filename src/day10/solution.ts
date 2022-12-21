type Maybe<T> = T | null;

const startChars = ["(", "[", "{", "<"];

type StartChar = "(" | "[" | "{" | "<";
type EndChar = ")" | "]" | "}" | ">";
type ChunkChar = StartChar | EndChar;

const PAIR: Record<EndChar, StartChar> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const POINTS: Record<EndChar, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function isStartChar(char: string): char is StartChar {
  return startChars.includes(char);
}

function findIllegalChar(chunk: ChunkChar[]): Maybe<EndChar> {
  const stack: string[] = [];

  for (const char of chunk) {
    if (isStartChar(char)) {
      stack.push(char);
    } else if (stack.pop() !== PAIR[char]) {
      return char;
    }
  }

  return null;
}

export function solutionA(chunks: string[]) {
  return chunks.reduce((totalPoints, chunk) => {
    const illegalChar = findIllegalChar(chunk.split("") as ChunkChar[]);
    const points = illegalChar ? POINTS[illegalChar] : 0;
    return totalPoints + points;
  }, 0);
}

export function solutionB(_input: string[]) {
  return 0;
}
