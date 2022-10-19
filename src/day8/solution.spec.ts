import path from "path";
import fs from "fs";
import { solutionA, solutionB } from "./solution";

const officialInput = fs
  .readFileSync(path.resolve(__dirname, "input.txt"), "utf-8")
  .split("\n");

describe("Day 8 - Part 1", () => {
  const part1Input = officialInput.flatMap((entry) =>
    entry.split("|")[1].trim().split(" ")
  );

  test("degenerate case", () => {
    expect(solutionA([])).toBe(0);
    expect(solutionA(["abcde", "abcdef"])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionA(["ab"])).toBe(1);
    expect(solutionA(["abc"])).toBe(1);
    expect(solutionA(["abcd"])).toBe(1);
    expect(solutionA(["abcdefg"])).toBe(1);
    expect(solutionA(["ab", "abcde", "abcdefg"])).toBe(2);
  });

  test("Official Solution - Part 1", () => {
    expect(solutionA(part1Input)).toBe(525);
  });
});

describe("Day 8 - Part 2", () => {
  test("degenerate case", () => {
    expect(solutionB([])).toBe(0);
    expect(solutionB([[[], []]])).toBe(0);
  });

  test("simple case", () => {
    expect(solutionB([[[], ["ab"]]])).toBe(1);
    expect(solutionB([[[], ["abc"]]])).toBe(7);
    expect(solutionB([[[], ["abcd"]]])).toBe(4);
    expect(solutionB([[[], ["abcdefg"]]])).toBe(8);
    expect(solutionB([[[], ["ab", "abcdefg"]]])).toBe(18);
  });

  test("complex case", () => {
    expect(
      solutionB([
        [
          [
            "be",
            "cfbegad",
            "cbdgef",
            "fgaecd",
            "cgeb",
            "fdcge",
            "agebfd",
            "fecdb",
            "fabcd",
            "edb",
          ],
          ["fdgacbe", "cefdb", "cefbgd", "gcbe"],
        ],
      ])
    ).toBe(8394);
    expect(
      solutionB([
        [
          [
            "edbfga",
            "begcd",
            "cbg",
            "gc",
            "gcadebf",
            "fbgde",
            "acbgfd",
            "abcde",
            "gfcbed",
            "gfec",
          ],
          ["fcgedb", "cgb", "dgebacf", "gc"],
        ],
      ])
    ).toBe(9781);
    expect(
      solutionB([
        [
          [
            "fgaebd",
            "cg",
            "bdaec",
            "gdafb",
            "agbcfd",
            "gdcbef",
            "bgcad",
            "gfac",
            "gcb",
            "cdgabef",
          ],
          ["cg", "cg", "fdcagb", "cbg"],
        ],
      ])
    ).toBe(1197);
    expect(
      solutionB([
        [
          [
            "fbegcd",
            "cbd",
            "adcefb",
            "dageb",
            "afcb",
            "bc",
            "aefdc",
            "ecdab",
            "fgdeca",
            "fcdbega",
          ],
          ["efabcd", "cedba", "gadfec", "cb"],
        ],
      ])
    ).toBe(9361);

    expect(
      solutionB([
        [
          [
            "fgde",
            "efc",
            "dacgf",
            "cbdgfa",
            "fe",
            "abdcfe",
            "afdbecg",
            "gaefdc",
            "gcfae",
            "abceg",
          ],
          ["ef", "agdcbf", "bfdagec", "efdg"],
        ],
      ])
    ).toBe(1684);
  });

  test("Official Solution - Part 2", () => {
    const input = officialInput.map((entry) =>
      entry.split("|").map((digits) => digits.trim().split(" "))
    );

    expect(solutionB(input)).toBe(1083859);
  });
});
