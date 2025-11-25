import z from "zod";

const stdin = await Bun.stdin.text();
const lines = stdin.split("\n");
const [firstList, lastList] = lines.reduce<[number[], number[]]>(
  ([firstList, lastList], line) => {
    const [firstNumber, lastNumber] = z
      .tuple([z.int(), z.int()])
      .parse(
        line.split(/\s+/).map((item) => z.coerce.number().int().parse(item))
      );
    return [
      [...firstList, firstNumber].toSorted(),
      [...lastList, lastNumber].toSorted(),
    ];
  },
  [[], []]
);

{
  console.time("part1");
  let result = 0;
  for (let i = 0; i < firstList.length; i++) {
    result += Math.abs(
      z.int().parse(firstList[i]) - z.int().parse(lastList[i])
    );
  }
  console.timeLog("part1", result);
}
