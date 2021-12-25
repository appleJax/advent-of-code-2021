import { Node } from "./Node";

export function solutionA(report: string[]) {
  if (report.length === 0) {
    return 0;
  }

  const initialCount = report[0].split("").map(() => [0, 0]);
  const digitCounts = report.reduce((counts, line) => {
    const digits = line.split("");
    return counts.map((c, i) => {
      const count = c;
      const index = Number(digits[i]);
      count[index] += 1;
      return c;
    });
  }, initialCount);

  const gammaString = digitCounts
    .map(([zeros, ones]) => (zeros > ones ? "0" : "1"))
    .join("");

  const gammaRate = parseInt(gammaString, 2);

  const maxVal = 2 ** report[0].length - 1;
  // XOR with max val to negate each digit
  // ex: 101 -> 101 ^ 111 -> 5 XOR 7 -> 010 -> 3
  // eslint-disable-next-line no-bitwise
  const epsilonRate = gammaRate ^ maxVal;

  return gammaRate * epsilonRate;
}

export function solutionB(report: string[]) {
  if (report.length === 0) {
    return 0;
  }

  const digitTree = report.reduce((tree, line) => {
    tree.insert(line);
    return tree;
  }, new Node("root"));

  const ogRating = getRating(digitTree, "OXYGEN_GENERATOR");
  const co2Rating = getRating(digitTree, "CO2_SCRUBBER");

  return ogRating * co2Rating;
}

type Rating = "OXYGEN_GENERATOR" | "CO2_SCRUBBER";

export function getRating(tree: Node, ratingType: Rating) {
  let rating = "";
  let found = false;
  let node = tree;

  while (!found) {
    const onlyZero = node.left && !node.right;
    let shouldUseZero = false;

    if (node.left && node.right) {
      shouldUseZero =
        ratingType === "OXYGEN_GENERATOR"
          ? node.left.count > node.right.count
          : node.left.count <= node.right.count;
    }

    if (onlyZero || shouldUseZero) {
      rating += "0";
      node = node.left!;
    } else if (node.right) {
      rating += "1";
      node = node.right;
    } else {
      found = true;
    }
  }

  return parseInt(rating, 2);
}
