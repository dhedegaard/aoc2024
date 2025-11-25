import z from "zod";

console.time("parse");
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
console.timeEnd("parse");

{
  console.time("part1");
  let result = 0;
  for (let i = 0; i < firstList.length; i++) {
    result += Math.abs((firstList[i] as number) - (lastList[i] as number));
  }
  console.timeLog("part1", result);
}

{
  console.time("part2");
  const countedLastList = lastList.reduce<Map<number, number>>((acc, value) => {
    acc.set(value, (acc.get(value) ?? 0) + 1);
    return acc;
  }, new Map<number, number>());
  const result = firstList
    .map((number) => (countedLastList.get(number) ?? 0) * number)
    .reduce((acc, result) => acc + result, 0);
  console.timeLog("part2", result);
}
