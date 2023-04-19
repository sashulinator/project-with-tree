import { add } from './add'

describe(add.name, () => {
  it('zero', () => {
    const list = [1, 2, 3]

    const newList = add(0, 0, list)

    expect(newList).toEqual([0, 1, 2, 3])
  })

  it('middle', () => {
    const list = [0, 1, 3]

    const newList = add(2, 2, list)

    expect(newList).toEqual([0, 1, 2, 3])
  })

  it('last', () => {
    const list = [0, 1, 2, 3]

    const newList = add(list.length, 4, list)

    expect(newList).toEqual([0, 1, 2, 3, 4])
  })
})
