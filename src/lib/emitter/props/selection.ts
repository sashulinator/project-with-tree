import { Id } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export class Selection<N extends string> extends Prop<N, Set<Id>> {
  // Select
  select = (value: Id): void => {
    this.value.add(value)
    this.value = this.value
  }

  remove = (id: Id): void => {
    this.value.delete(id)
    this.value = this.value
  }

  toggle = (id: Id): void => {
    this.value.has(id) ? this.remove(id) : this.select(id)
  }

  isSelected = (id: Id): boolean => {
    return this.value.has(id)
  }
}
