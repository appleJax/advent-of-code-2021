export function solutionA(input: string[]) {
  return input.filter((segment) => [2, 3, 4, 7].includes(segment.length))
    .length;
}

type Entry = string[][];

export function solutionB(input: Entry[]) {
  return input.reduce((sum, [patterns, outputDigits]) => {
    const translationKey = getTranslationKey([...patterns, ...outputDigits]);
    const decoded = decodeOutput(outputDigits, translationKey);
    return sum + decoded;
  }, 0);
}

const DIGITS = [
  /* 0 */ "abcefg",
  /* 1 */ "cf",
  /* 2 */ "acdeg",
  /* 3 */ "acdfg",
  /* 4 */ "bcdf",
  /* 5 */ "abdfg",
  /* 6 */ "abdefg",
  /* 7 */ "acf",
  /* 8 */ "abcdefg",
  /* 9 */ "abcdfg",
];

const WIRES = ["a", "b", "c", "d", "e", "f", "g"] as const;

type Wire = typeof WIRES[number];

type TranslationKey = {
  [_ in Wire]: Wire[];
};

function newTranslationKey(): TranslationKey {
  return {
    a: [...WIRES],
    b: [...WIRES],
    c: [...WIRES],
    d: [...WIRES],
    e: [...WIRES],
    f: [...WIRES],
    g: [...WIRES],
  };
}

type IndexMap = {
  [patternLength: number]: number | number[];
};

const patternLengthToDigitIndex: IndexMap = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
  5: [2, 3, 5],
  6: [0, 6, 9],
};

function getTranslationKey(patterns: string[]) {
  const translationKey = newTranslationKey();

  // filter possibilities with the 4 unique pattern lengths
  for (const pattern of patterns) {
    const digitIndex = patternLengthToDigitIndex[pattern.length];
    if (typeof digitIndex === "number") {
      const possibleWires = DIGITS[digitIndex].split("");
      (pattern.split("") as Wire[]).forEach((char) => {
        translationKey[char] = translationKey[char].filter((wire) =>
          possibleWires.includes(wire)
        );
      });
    }
  }

  // use matched wires to filter out mutually exclusive translations
  let passes = 2;
  while (passes-- > 0) {
    for (const wire of WIRES) {
      if (translationKey[wire].length === 1) {
        // if a wire has only one possible translation,
        // remove that value from all other wire translation possibilities
        WIRES.filter((w) => w !== wire).forEach((w) => {
          translationKey[w] = translationKey[w].filter(
            (char) => char !== translationKey[wire][0]
          );
        });
      }
    }

    for (const wire of WIRES) {
      if (translationKey[wire].length === 2) {
        // if two wires have the same two possible translations,
        // remove those values from all other wire translation possibilities
        WIRES.filter((w) => w !== wire).forEach((w) => {
          if (translationKey[w].join("") === translationKey[wire].join("")) {
            WIRES.filter((w2) => ![wire, w].includes(w2)).forEach((w2) => {
              translationKey[w2] = translationKey[w2].filter(
                (char) => !translationKey[wire].includes(char)
              );
            });
          }
        });
      }
    }
  }

  const doubleMatches = getDoubleMatches(translationKey);

  doubleMatches.forEach(({ from, to }) => {
    const checkPatterns = patterns.filter(
      (pattern) =>
        Array.isArray(patternLengthToDigitIndex[pattern.length]) &&
        from.some((wire) => pattern.includes(wire)) &&
        !from.every((wire) => pattern.includes(wire))
    );

    for (const checkPattern of checkPatterns) {
      const indices = patternLengthToDigitIndex[checkPattern.length];
      if (Array.isArray(indices)) {
        const digitCodes = indices
          .map((index) => DIGITS[index])
          .filter((code) =>
            to.some(
              (wire) =>
                code.includes(wire) && !to.every((wire) => code.includes(wire))
            )
          );

        if (digitCodes.length === 1) {
          const digitCode = digitCodes[0];
          let [fromFound, fromAbsent] = from;
          let [toFound, toAbsent] = to;

          if (checkPattern.includes(fromAbsent)) {
            [fromFound, fromAbsent] = [fromAbsent, fromFound];
          }
          if (digitCode.includes(toAbsent)) {
            [toFound, toAbsent] = [toAbsent, toFound];
          }

          translationKey[fromFound] = [toFound];
          translationKey[fromAbsent] = [toAbsent];
        }
      }
    }
  });

  return translationKey;
}

function getDoubleMatches(translationKey: TranslationKey) {
  const doubleMatchedWires = Object.values(translationKey).reduce<string[]>(
    (matches, possibilities) => {
      if (possibilities.length === 2) {
        const wires = possibilities.join("");
        if (!matches.includes(wires)) {
          matches.push(wires);
        }
      }
      return matches;
    },
    []
  );

  return doubleMatchedWires.map((wires) => {
    const match: { from: Wire[]; to: Wire[] } = {
      from: [],
      to: wires.split("") as Wire[],
    };

    WIRES.forEach((w) => {
      if (translationKey[w].join("") === wires) {
        match.from.push(w);
      }
    });

    return match;
  });
}

function decodeOutput(outputDigits: string[], translationKey: TranslationKey) {
  const numString = outputDigits
    .map((pattern) =>
      pattern
        .split("")
        .map((wire) => translationKey[wire as Wire][0])
        .sort()
        .join("")
    )
    .map((translatedPattern) => {
      const digitIndex = patternLengthToDigitIndex[translatedPattern.length];
      return typeof digitIndex === "number"
        ? digitIndex
        : DIGITS.findIndex((d) => d === translatedPattern);
    })
    .join("");

  return Number(numString);
}
