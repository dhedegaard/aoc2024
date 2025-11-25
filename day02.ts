import z from 'zod'

console.time('parse')
const lines = await Bun.stdin
  .text()
  .then((text) =>
    text
      .split('\n')
      .map((line) => line.split(/\s+/).map((item) => z.coerce.number().int().parse(item)))
  )
console.timeEnd('parse')

console.time('part1')
const result = lines.reduce<number>((result, numbers) => {
  let levelType: 'increasing' | 'decreasing' | null = null
  for (let i = 1; i < numbers.length; i++) {
    const previous = numbers[i - 1]
    const current = numbers[i]
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
      return result
    }
    const diff = Math.abs(previous - current)
    if (diff < 1 || diff > 3) {
      return result
    }
  }
  return result + 1
}, 0)
console.timeLog('part1', result)
