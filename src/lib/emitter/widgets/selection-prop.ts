import { Id } from '~/utils/core'
import { Prop } from '~/utils/emitter'
import { remove, toggle } from '~/utils/id-array'
import { push } from '~/utils/list'

export class Selection<N extends string> extends Prop<N, Id[]> {
  // Select
  select = (id: Id): void => {
    if (this.value.includes(id)) return
    this.value = push(id, this.value)
  }

  remove = (id: Id): void => {
    this.value = remove(id, this.value)
  }

  toggle = (id: Id): void => {
    this.value = toggle(id, this.value)
  }

  isSelected = (id: Id): boolean => {
    return this.value.includes(id)
  }
}
