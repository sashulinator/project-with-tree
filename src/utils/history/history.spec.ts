import { History } from './history'

describe(History.name, () => {
  it('basic', () => {
    const h = new History<string>()

    h.add('a')
    h.add('b')
    h.add('c')
    h.add('d')

    h.next()

    expect(h.getCurrent()).toEqual('d')
    expect(h.array.length).toEqual(4)

    h.previous()
    h.previous()
    h.next()

    expect(h.getCurrent()).toEqual('c')
    expect(h.array.length).toEqual(4)

    h.previous()
    h.previous()
    h.previous()
    h.previous()

    expect(h.getCurrent()).toEqual('a')
    expect(h.array.length).toEqual(4)

    h.next()
    expect(h.getCurrent()).toEqual('b')
    h.add('A')
    h.next()
    h.next()

    expect(h.getCurrent()).toEqual('A')
    expect(h.array).toEqual(['a', 'b', 'A'])
  })
})
