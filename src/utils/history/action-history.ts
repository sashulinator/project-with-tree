import { History, HistoryProps } from './history'

export interface HistoryItem {
  redo: () => void
  undo: () => void
  done: boolean
}

export class ActionHistory {
  history: History<HistoryItem>

  constructor(props?: HistoryProps<HistoryItem>) {
    this.history = new History<HistoryItem>(props)
  }

  add(onRedo: () => void, onUndo: () => void): void {
    const redo = (): void => {
      onRedo()
      item.done = true
    }
    const undo = (): void => {
      onUndo()
      item.done = false
    }
    const item: HistoryItem = { done: true, redo, undo }
    this.history.add(item)
  }

  prev(): void {
    const { done, undo } = this.history.getCurrent()
    this.history.previous()
    done ? undo() : this.history.getCurrent()?.undo()
  }

  next(): void {
    const { done, redo } = this.history.getCurrent()
    this.history.next()
    done ? this.history.getCurrent()?.redo() : redo()
  }

  redo(): void {
    this.history.getCurrent()?.redo()
  }
}