import { Id } from '~/utils/core'
import { Emitter, Prop } from '~/utils/emitter'

export type Events = {
  selected: { value: Id[] }
  preselected: { value: Id[] }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStateProps<Item> {
  getItemId: (item: Item) => Id
}

export class State<Item, E extends object = object> extends Emitter<E & Events> {
  selected: Prop<'selected', Id[]>

  highlighted: Prop<'highlighted', Id[]>

  getItemId: (item: Item) => Id

  constructor(props: ItemStateProps<Item>) {
    super()

    this.selected = new Prop('selected', [] as Id[], this)

    this.highlighted = new Prop('highlighted', [] as Id[], this)

    this.getItemId = props.getItemId
  }
}
