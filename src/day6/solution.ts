export function solutionA(initialState: number[], days: number) {
  const state = [...initialState];
  while (days-- > 0) {
    const length = state.length;
    let newFish = 0;
    for (let i = 0; i < length; i++) {
      if (state[i] === 0) {
        newFish++;
        state[i] = 6;
      } else {
        state[i] = state[i] - 1;
      }
    }

    for (let i = 0; i < newFish; i++) {
      state[length + i] = 8;
    }
  }

  return state.length;
}

type AgeCount = {
  [age: number]: number;
};

const ageCounts: AgeCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
};

export function solutionB(initialState: number[], days: number) {
  const state = initialState.reduce(
    (ages, fishAge) => ({
      ...ages,
      [fishAge]: ages[fishAge] + 1,
    }),
    ageCounts
  );

  while (days-- > 0) {
    const zeroCount = state[0];
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((age) => {
      state[age] = state[age + 1];
    });
    state[8] = zeroCount;
    state[6] += zeroCount;
  }

  return Object.values(state).reduce<number>(
    (totalFish, count) => totalFish + count,
    0
  );
}
