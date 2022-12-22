const startChars = ["(", "[", "{", "<"];

type StartChar = "(" | "[" | "{" | "<";
type EndChar = ")" | "]" | "}" | ">";
type ChunkChar = StartChar | EndChar;

const END_TO_START: Record<EndChar, StartChar> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const ILLEGAL_CHAR_POINTS: Record<EndChar, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

function isStartChar(char: string): char is StartChar {
  return startChars.includes(char);
}

type IllegalResult = {
  illegalChar: EndChar;
};

type IncompleteResult = {
  charStack: StartChar[];
};

type ChunkResult = IllegalResult | IncompleteResult;

function splitChunk(chunk: string) {
  if (/[^()[\]{}<>]/.test(chunk)) {
    throw new Error(`Chunk contains invalid characters: ${chunk}`);
  }
  return chunk.split("") as ChunkChar[];
}

function analyzeChunk(chunk: string): ChunkResult {
  const chunkChars = splitChunk(chunk);
  const charStack: StartChar[] = [];

  for (const char of chunkChars) {
    if (isStartChar(char)) {
      charStack.push(char);
    } else if (charStack.pop() !== END_TO_START[char]) {
      return {
        illegalChar: char,
      };
    }
  }

  return {
    charStack,
  };
}

export function solutionA(chunks: string[]) {
  return chunks.reduce((totalPoints, chunk) => {
    const result = analyzeChunk(chunk);
    const points =
      "illegalChar" in result ? ILLEGAL_CHAR_POINTS[result.illegalChar] : 0;
    return totalPoints + points;
  }, 0);
}

const START_TO_END: Record<StartChar, EndChar> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const INCOMPLETE_CHAR_POINTS: Record<EndChar, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export function solutionB(chunks: string[]) {
  const sortedScores = chunks.reduce<number[]>((sorted, chunk) => {
    const result = analyzeChunk(chunk);
    if ("illegalChar" in result) {
      return sorted;
    }

    let points = 0;
    let startChar = result.charStack.pop();
    while (startChar) {
      const missingChar = START_TO_END[startChar];
      points *= 5;
      points += INCOMPLETE_CHAR_POINTS[missingChar];

      startChar = result.charStack.pop();
    }

    const firstLesserScore = sorted.findIndex((score) => score < points);
    if (firstLesserScore === -1) {
      sorted.push(points);
    } else {
      sorted.splice(firstLesserScore, 0, points);
    }

    return sorted;
  }, []);

  const middleIndex = Math.floor(sortedScores.length / 2);

  return sortedScores[middleIndex] || 0;
}
