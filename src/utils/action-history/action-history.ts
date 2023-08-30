export interface HistoryItem {
  done: boolean
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
    this.array.unshift(item)
  }

  findCurrent(): HistoryItem | undefined {
    return this.array.find((item) => item.done)
  }

  findNext(): HistoryItem | undefined {
    return this.array.find((_, i) => this.array[i + 1]?.done)
  }

  findPrevious(): HistoryItem | undefined {
    return this.array.find((_, i) => this.array[i - 1]?.done)
  }
}
