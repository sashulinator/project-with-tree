import { Id, assertDefined } from '~/utils/core'
import { add, remove } from '~/utils/dictionary'
import { EmittableState } from '~/utils/emittable-state/emmitable-state'
import { History } from '~/utils/history'

import { EventNames } from './event-names'
import { Events } from './events'

export interface Translate {
  x: number
  y: number
}

export interface Position {
  x: number
  y: number
}

export interface HistoryItem {
  redo: () => void
  undo: () => void
  done: boolean
}

export interface StateProps<S> {
  translate: Translate
  scale: number
  itemStates: Record<Id, S>
}

export interface ItemState {
  position: Position
  setPosition: (position: Position) => void
}

export class State<D, S extends ItemState> extends EmittableState<D, Events<S>> {
  translate: Translate

  scale: number

  selected: Id[]

  itemStates: Record<Id, S>

  history: History<HistoryItem>

  constructor(data: D, props: StateProps<S>) {
    super(data)
    this.subscribe()

    this.scale = props.scale
    this.translate = props.translate

    const initSelected = []
    const initItemStates = props.itemStates

    this.selected = initSelected
    this.itemStates = initItemStates

    this.history = new History<HistoryItem>()
  }

  private subscribe = (): void => {
    this.mitt.on(EventNames.setScale, (event) => {
      this.scale = event.scale
    })
    this.mitt.on(EventNames.setTranslate, (event) => {
      this.translate = event.translate
    })
    this.mitt.on(EventNames.setItemStates, (event) => {
      this.itemStates = event.itemStates
    })
    this.mitt.on(EventNames.select, (event) => {
      this.selected = event.ids
    })
    this.mitt.on(EventNames.setItemPosition, (event) => {
      const state = this.itemStates[event.id]
      assertDefined(state)
      state.setPosition(event.position)
    })
  }

  // History
  addHistory<E extends EventNames>(eventName: E, currentEvent: Events<S>[E], prevEvent: Events<S>[E]): void {
    const redo = (): void => {
      this.mitt.emit(eventName, currentEvent)
      item.done = true
    }
    const undo = (): void => {
      this.mitt.emit(eventName, prevEvent)
      item.done = false
    }
    const item: HistoryItem = { done: true, redo, undo }
    this.history.add(item)
  }

  prevHistory(): void {
    const { done, undo } = this.history.getCurrent()
    this.history.previous()
    done ? undo() : this.history.getCurrent()?.undo()
  }

  nextHistory(): void {
    const { done, redo } = this.history.getCurrent()
    this.history.next()
    done ? this.history.getCurrent()?.redo() : redo()
  }

  // Camera
  setTranslate = (translate: Translate): void => {
    this.mitt.emit(EventNames.setTranslate, { translate })
  }

  setScale = (scale: number): void => {
    this.mitt.emit(EventNames.setScale, { scale })
  }

  // Select
  select = (ids: Id[]): void => {
    this.addHistory(EventNames.select, { ids }, { ids: this.selected })
    this.mitt.emit(EventNames.select, { ids })
  }

  unselect = (ids: Id[]): void => {
    this.select(this.selected.filter((s) => !ids.includes(s)))
  }

  selectToggle = (id: Id): void => {
    const isIncludes = this.selected.includes(id)
    isIncludes ? this.unselect([id]) : this.select([...this.selected, id])
  }

  // CRUD
  setItemStates = (itemStates: Record<Id, S>): void => {
    this.addHistory(EventNames.setItemStates, { itemStates }, { itemStates: this.itemStates })
    this.mitt.emit(EventNames.setItemStates, { itemStates })
  }

  addItemState = (id: Id, state: S): void => {
    const newItemStates = add(this.itemStates, id, state)
    this.setItemStates(newItemStates)
  }

  removeItemState = (id: Id): void => {
    const newItemStates = remove(this.itemStates, id)
    this.setItemStates(newItemStates)
  }

  // ItemState
  setItemPosition(id: Id, position: Position, prevPosition: Position): void {
    this.addHistory(EventNames.setItemPosition, { id, position }, { id, position: prevPosition })
  }
}
