import { ActionHistory, HistoryItem } from './action-history'

describe(ActionHistory.name, () => {
  it('basic', () => {
    const next = {
      done: false,
      storeLocally: true,
      username: 'next',
      events: [
        {
          type: 'next',
          redo: { test: 'next' },
          undo: { test: 'next' },
        },
      ],
    }
    const current = {
      done: true,
      storeLocally: true,
      username: 'current',
      events: [{ type: 'current', redo: { test: 'current' }, undo: { test: 'current' } }],
    }
    const previous = {
      done: true,
      storeLocally: true,
      username: 'previous',
      events: [
        {
          type: 'previous',
          redo: { test: 'previous' },
          undo: { test: 'previous' },
        },
      ],
    }
    const items: HistoryItem[] = [next, current, previous]
    const h = new ActionHistory(items)

    expect(h.findCurrent()).toEqual(current)
    expect(h.findNext()).toEqual(next)
    expect(h.findPrevious()).toEqual(previous)
  })

  it('all false', () => {
    const item1 = {
      done: false,
      storeLocally: true,
      username: 'item1',
      events: [
        {
          type: 'item1',
          redo: { test: 'item1' },
          undo: { test: 'item1' },
        },
      ],
    }
    const item2 = {
      done: false,
      storeLocally: true,
      username: 'item2',
      events: [
        {
          type: 'item2',
          redo: { test: 'item2' },
          undo: { test: 'item2' },
        },
      ],
    }
    const item3 = {
      done: false,
      storeLocally: true,
      username: 'item3',
      events: [
        {
          type: 'item3',
          redo: { test: 'item3' },
          undo: { test: 'item3' },
        },
      ],
    }
    const items: HistoryItem[] = [item1, item2, item3]
    const h = new ActionHistory(items)

    expect(h.findCurrent()).toEqual(undefined)
    expect(h.findNext()).toEqual(item3)
    expect(h.findPrevious()).toEqual(undefined)
  })
})
