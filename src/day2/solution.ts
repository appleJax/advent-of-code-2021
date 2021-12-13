export function solutionA(directions: string[]) {
  const position = {
    x: 0,
    y: 0,
  };

  directions.forEach((command) => {
    const delta = parseCommand(command);
    position.x += delta.x;
    position.y += delta.y;
  });

  return position.x * position.y;
}

export function solutionB(directions: string[]) {
  const position = {
    x: 0,
    y: 0,
    aim: 0,
  };

  directions.forEach((command) => {
    const delta = parseCommand(command);
    position.x += delta.x;
    position.aim += delta.y;
    position.y += delta.x * position.aim;
  });

  return position.x * position.y;
}

export function parseCommand(command: string) {
  const [direction, magnitude] = command.split(" ");
  switch (direction) {
    case "down":
      return { x: 0, y: Number(magnitude) };
    case "up":
      return { x: 0, y: -Number(magnitude) };
    case "forward":
      return { x: Number(magnitude), y: 0 };
    default:
      throw new Error(`Invalid command: ${command}`);
  }
}
