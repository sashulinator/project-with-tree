import { TraversalResult, walk } from './walk-gen'

describe(walk.name, () => {
  test('All arguments have correct value', () => {
    const dictionary = {
      a: 'aValue',
      b: 'bValue',
      c: 'cValue',
    }

    const iterations: TraversalResult<string>[] = []

    for (const iter of walk(dictionary)) {
      iterations.push(iter)
    }

    expect(iterations[0]).toEqual({
      value: 'aValue',
      key: 'a',
      keys: ['a', 'b', 'c'],
      path: ['a'],
      parent: undefined,
      dictionary,
    })
    expect(iterations[1]).toEqual({
      value: 'bValue',
      key: 'b',
      keys: ['a', 'b', 'c'],
      path: ['b'],
      parent: undefined,
      dictionary,
    })
    expect(iterations[2]).toEqual({
      value: 'cValue',
      key: 'c',
      keys: ['a', 'b', 'c'],
      path: ['c'],
      parent: undefined,
      dictionary,
    })
  })
})
