import { Id, generateId } from '../core'

export interface HistoryItem {
  id?: Id
  done: boolean
  storeLocally: boolean
  type: string
  username: string
  redo: Record<string, unknown>
  undo: Record<string, unknown>
}

export class ActionHistory {
  array: HistoryItem[]

  constructor(array?: HistoryItem[]) {
    this.array = array || []
  }

  add(item: HistoryItem) {
    this.array.unshift({ id: generateId(), ...item })
  }

  findCurrent(): HistoryItem | undefined {
    return this.array.find((item, i) => {
      return item.done
    })
  }

  findNext(): HistoryItem | undefined {
    return this.array.find((item, i) => {
      return this.array[i + 1]?.done || i === this.array.length - 1
    })
  }

  findPrevious(): HistoryItem | undefined {
    return this.array.find((_, i) => this.array[i - 1]?.done)
  }
}
