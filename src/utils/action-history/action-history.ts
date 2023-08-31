import { Id, generateId } from '../core'

export interface HistoryItem<
  TEvent extends {
    type: string
    redo: Record<string, unknown>
    undo: Record<string, unknown>
    historical: boolean
  } = {
    type: string
    redo: Record<string, unknown>
    undo: Record<string, unknown>
    historical: boolean
  },
> {
  id?: Id
  done: boolean
  username: string
  events: TEvent[]
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
    for (let i = 0; i < this.array.length; i++) {
      const item = this.array[i]
      const nextItem = this.array[i + 1]
      const isLast = i === this.array.length - 1
      // Если первый и втрой done то next не существует
      if (i === 0 && item?.done && nextItem?.done) return undefined
      // Если следующий done то этот next
      if (nextItem?.done) return item
      // Если все элементы не done, то последний next
      if (isLast) return item
    }
  }

  findPrevious(): HistoryItem | undefined {
    return this.array.find((_, i) => this.array[i - 1]?.done)
  }
}
