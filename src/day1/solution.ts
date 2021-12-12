export function solutionA(depths: number[]) {
  let prevDepth = Infinity;
  return depths.reduce((increases, depth) => {
    let nextValue = increases;
    if (depth > prevDepth) {
      nextValue += 1;
    }
    prevDepth = depth;

    return nextValue;
  }, 0);
}

export function solutionB(depths: number[]) {
  if (depths.length < 4) {
    return 0;
  }

  let increases = 0;
  for (let i = 3; i < depths.length; i++) {
    if (depths[i] > depths[i - 3]) {
      increases += 1;
    }
  }

  return increases;
}
