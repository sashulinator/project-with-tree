import { ActionHistory } from './action-history'

describe(ActionHistory.name, () => {
  it('basic', () => {
    const next = {
      id: 'test',
      done: false,
      storeLocally: true,
      username: 'next',
      list: [
        {
          historical: true,
          type: 'next',
          redo: { test: 'next' },
          undo: { test: 'next' },
        },
      ],
    }
    const current = {
      id: 'test',
      done: true,
      username: 'current',
      list: [{ type: 'current', historical: true, redo: { test: 'current' }, undo: { test: 'current' } }],
    }
    const previous = {
      id: 'test',
      done: true,
      storeLocally: true,
      username: 'previous',
      list: [
        {
          historical: true,
          type: 'previous',
          redo: { test: 'previous' },
          undo: { test: 'previous' },
        },
      ],
    }
    const items = [next, current, previous]
    const h = new ActionHistory(items)

    expect(h.findCurrent()).toEqual(current)
    expect(h.findNext()).toEqual(next)
    expect(h.findPrevious()).toEqual(previous)
  })

  it('all false', () => {
    const item1 = {
      id: 'test',
      done: false,
      storeLocally: true,
      username: 'item1',
      list: [
        {
          historical: true,
          type: 'item1',
          redo: { test: 'item1' },
          undo: { test: 'item1' },
        },
      ],
    }
    const item2 = {
      id: 'test',
      done: false,
      storeLocally: true,
      username: 'item2',
      list: [
        {
          historical: true,
          type: 'item2',
          redo: { test: 'item2' },
          undo: { test: 'item2' },
        },
      ],
    }
    const item3 = {
      id: 'test',
      done: false,
      storeLocally: true,
      username: 'item3',
      list: [
        {
          historical: true,
          type: 'item3',
          redo: { test: 'item3' },
          undo: { test: 'item3' },
        },
      ],
    }
    const items = [item1, item2, item3]
    const h = new ActionHistory(items)

    expect(h.findCurrent()).toEqual(undefined)
    expect(h.findNext()).toEqual(item3)
    expect(h.findPrevious()).toEqual(undefined)
  })
})
