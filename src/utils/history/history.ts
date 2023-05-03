export interface HistoryProps<T> {
  index?: number
  array?: T[]
}

export class History<T> {
  private _index: number

  array: T[]

  constructor(props?: HistoryProps<T>) {
    this._index = props?.index ?? -1
    this.array = props?.array ?? []
  }

  add(item: T) {
    this._index += 1
    this.array[this._index] = item
    if (this._index < this.array.length - 1) {
      this.array = this.array.slice(0, this._index + 1)
    }
  }

  getCurrent(): T {
    return this.array[this._index]
  }

  previous() {
    if (this._index < 1) return
    this._index -= 1
  }

  next() {
    if (this._index > this.array.length - 2) return
    this._index += 1
  }
}
