import { ActionHistory, HistoryItem } from './action-history'

describe(ActionHistory.name, () => {
  it('basic', () => {
    const next = {
      done: false,
      type: 'next',
      username: 'next',
      redo: { test: 'next' },
      undo: { test: 'next' },
    }
    const current = {
      done: true,
      type: 'current',
      username: 'current',
      redo: { test: 'current' },
      undo: { test: 'current' },
    }
    const previous = {
      done: true,
      type: 'previous',
      username: 'previous',
      redo: { test: 'previous' },
      undo: { test: 'previous' },
    }
    const items: HistoryItem[] = [next, current, previous]
    const h = new ActionHistory(items)

    expect(h.findCurrent()).toEqual(current)
    expect(h.findNext()).toEqual(next)
    expect(h.findPrevious()).toEqual(previous)
  })
})
