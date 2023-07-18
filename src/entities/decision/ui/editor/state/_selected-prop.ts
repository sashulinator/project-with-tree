import { Id } from '~/utils/core'
import { Prop } from '~/utils/depricated-emitter'

export class SelectedProp<N extends string> extends Prop<N, Id[]> {
  // Select
  add = (value: Id): void => {
    this.value = [value]
  }

  remove = (idToUnselect: Id): void => {
    this.value = this.value.filter((id) => idToUnselect !== id)
  }

  toggle = (id: Id): void => {
    if (this.value.includes(id)) {
      this.remove(id)
    } else {
      this.value = [...this.value, id]
    }
  }

  isSelected = (id: Id): boolean => {
    return this.value.includes(id)
  }
}
