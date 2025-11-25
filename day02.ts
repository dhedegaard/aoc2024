import z from 'zod'

console.time('parse')
const lines: readonly (readonly number[])[] = await Bun.stdin
  .text()
  .then((text) =>
    text
      .split('\n')
      .map((line) => line.split(/\s+/).map((item) => z.coerce.number().int().parse(item)))
  )
console.timeEnd('parse')

function checkValid(
  numbers: readonly number[]
): { valid: true } | { valid: false; failedIndex: number } {
  let levelType: 'increasing' | 'decreasing' | null = null
  for (let index = 1; index < numbers.length; index++) {
    const previous = numbers[index - 1]
    const current = numbers[index]
    if (previous == null || current == null) {
      throw new Error('Unexpected null value')
    }
    if (levelType == null) {
      levelType = current > previous ? 'increasing' : 'decreasing'
    }
    if (
      (levelType === 'increasing' && current < previous) ||
      (levelType === 'decreasing' && current > previous)
    ) {
      return { valid: false, failedIndex: index }
    }
    const diff = Math.abs(previous - current)
    if (diff < 1 || diff > 3) {
      return { valid: false, failedIndex: index }
    }
  }
  return { valid: true }
}

{
  console.time('part1')
  const result = lines.reduce<number>(
    (result, numbers) => (checkValid(numbers).valid ? result + 1 : result),
    0
  )
  console.timeLog('part1', result)
}

console.time('part2')

const result = lines.reduce<number>((result, numbers) => {
  const firstResult = checkValid(numbers)
  if (firstResult.valid) {
    return result + 1
  }
  const secondResult = checkValid(numbers.toSpliced(firstResult.failedIndex, 1))
  if (secondResult.valid) {
    return result + 1
  }
  return result
}, 0)
console.timeLog('part2', result)
