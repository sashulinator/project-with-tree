import { Emitter } from '~/lib/emitter/emitter'
import { Id } from '~/utils/core'
import { AnyEvent, Prop } from '~/utils/emitter'

export type Events = {
  selected: { value: Id[] }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ItemStateProps<Item> {
  getItemId: (item: Item) => Id
}

export class State<Item, E extends AnyEvent = AnyEvent> extends Emitter<E & Events> {
  selected: Prop<'selected', Id[]>

  preselected: Prop<'preselected', Id | undefined>

  getItemId: (item: Item) => Id

  constructor(props: ItemStateProps<Item>) {
    super()

    this.selected = new Prop<'selected', Id[]>('selected', [], this)

    this.preselected = new Prop<'preselected', Id | undefined>('preselected', undefined, this)

    this.getItemId = props.getItemId
  }
}
