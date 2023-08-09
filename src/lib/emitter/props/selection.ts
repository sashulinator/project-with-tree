import { Id } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export class Selection<N extends string> extends Prop<N, Set<Id>> {
  // Select
  select = (value: Id): void => {
    this.value = new Set(this.value).add(value)
  }

  remove = (id: Id): void => {
    const set = new Set(this.value)
    set.delete(id)
    this.value = set
  }

  toggle = (id: Id): void => {
    this.value.has(id) ? this.remove(id) : this.select(id)
  }

  isSelected = (id: Id): boolean => {
    return this.value.has(id)
  }
}