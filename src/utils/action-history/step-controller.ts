import { getUsername } from '~/shared/username'

import { Id, generateId } from '../core'
import { Item, Step } from './types/step'

export class StepController {
  private id: Id
  private list: Item[]
  private done: boolean
  private username: string

  constructor() {
    this.id = generateId()

    this.done = false

    this.username = getUsername()

    this.list = []
  }

  build(): Step {
    const step: Step = {
      id: this.id,
      done: this.done,
      username: this.username,
      list: [...this.list],
    }

    this.id = generateId()
    this.list = []

    return step
  }

  add(type: string, redo: Record<string, unknown>, undo: Record<string, unknown>, historical = true): this {
    this.list.push({ type, redo, undo, historical })
    return this
  }
}
