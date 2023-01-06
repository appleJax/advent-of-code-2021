let CONNECTIONS: Record<string, string[]> = {
  start: [],
};

function buildConnections(pairs: string[]) {
  CONNECTIONS = { start: [] };
  pairs.forEach((pair) => {
    const [a, b] = pair.split("-");
    CONNECTIONS[a] = (CONNECTIONS[a] || []).concat(b);
    CONNECTIONS[b] = (CONNECTIONS[b] || []).concat(a);
  });
}

function isSmallCave(caveId: string) {
  return caveId.toLowerCase() === caveId;
}

function stopTraversalA(nextCave: string, visited: Map<string, number>) {
  return isSmallCave(nextCave) && !!visited.get(nextCave);
}

function stopTraversalB(nextCave: string, visited: Map<string, number>) {
  return (
    stopTraversalA(nextCave, visited) &&
    Array.from(visited.values()).some((count) => count > 1)
  );
}

type StopTraversal = (
  _caveId: string,
  _visited: Map<string, number>
) => boolean;

type BuildPathsArgs = {
  path: string;
  nextCave: string;
  visited: Map<string, number>;
  allPaths: Set<string>;
  stopTraversal: StopTraversal;
};

function buildPaths({
  path,
  nextCave,
  visited,
  allPaths,
  stopTraversal,
}: BuildPathsArgs) {
  if (nextCave === "start" || stopTraversal(nextCave, visited)) {
    return;
  }

  if (isSmallCave(nextCave)) {
    visited.set(nextCave, (visited.get(nextCave) || 0) + 1);
  }
  path += `-${nextCave}`;

  if (nextCave === "end") {
    allPaths.add(path);
  } else {
    CONNECTIONS[nextCave].forEach((caveId) =>
      buildPaths({
        path,
        nextCave: caveId,
        visited: new Map(visited),
        allPaths,
        stopTraversal,
      })
    );
  }
}

function solve(pairs: string[], stopTraversal: StopTraversal) {
  buildConnections(pairs);
  const allPaths: Set<string> = new Set();

  CONNECTIONS.start.forEach((caveId) =>
    buildPaths({
      path: "start",
      nextCave: caveId,
      visited: new Map(),
      allPaths,
      stopTraversal,
    })
  );

  return allPaths.size;
}

export function solutionA(pairs: string[]) {
  return solve(pairs, stopTraversalA);
}

export function solutionB(pairs: string[]) {
  return solve(pairs, stopTraversalB);
}
