import { ActionHistory } from './action-history'

describe(History.name, () => {
  it('basic', () => {
    const h = new ActionHistory()

    let str = 'a'
    const addB = () => (str = `${str}B`)
    const removeB = () => (str = str.replace('B', ''))
    const addC = () => (str = `${str}C`)
    const removeC = () => (str = str.replace('C', ''))
    const addD = () => (str = `${str}D`)
    const removeD = () => (str = str.replace('D', ''))

    h.add(addB, removeB)
    h.redo()

    expect(str).toBe('aB')

    h.add(addC, removeC)
    h.redo()

    expect(str).toBe('aBC')

    h.add(addD, removeD)
    h.redo()

    expect(str).toBe('aBCD')

    h.previous()

    expect(str).toBe('aBC')

    h.previous()

    expect(str).toBe('aB')

    h.next()
    h.next()

    expect(str).toBe('aBCD')

    h.previous()
    h.previous()
    h.previous()
    // that prevs does not exists
    h.previous()
    h.previous()
    h.previous()

    expect(str).toBe('a')

    h.next()
    expect(str).toBe('aB')

    h.next()
    expect(str).toBe('aBC')

    h.next()
    expect(str).toBe('aBCD')

    h.previous()
    h.previous()
    h.previous()
    // that prevs does not exists
    h.previous()
    h.previous()
    h.previous()

    expect(str).toBe('a')

    h.next() // aB
    h.add(addD, removeD)
    h.redo() // aBD

    expect(str).toBe('aBD')
  })
})
