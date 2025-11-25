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
  let result = 0;
  while (firstList.length > 0 && lastList.length > 0) {
    result += Math.abs(
      z.int().parse(firstList.pop()) - z.int().parse(lastList.pop())
    );
  }
  console.log("Part 1:", result);
}
