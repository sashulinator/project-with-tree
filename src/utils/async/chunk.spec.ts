import { chunk } from './chunk'

describe(chunk.name, () => {
  it('basic', async () => {
    const list = [1, 2, 3, 4]

    const test = await chunk(
      list.length,
      2,
      (acc, chunkStart, chunkEnd) => {
        const listChunk = list.slice(chunkStart, chunkEnd)
        return [...acc, ...listChunk.map(() => `number: ${chunkStart}`)]
      },
      [] as string[]
    )

    expect(test).toEqual([`number: 0`, `number: 0`, `number: 2`, `number: 2`])
  })

  it('quit', async () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    const test = await chunk(
      list.length,
      2,
      (acc, chunkStart, chunkEnd) => {
        if (chunkStart > 1) {
          return true
        }
        const listChunk = list.slice(chunkStart, chunkEnd)
        return [...acc, ...listChunk.map(() => `number: ${chunkStart}`)]
      },
      [] as string[]
    )

    expect(test).toEqual([`number: 0`, `number: 0`])
  })
})
