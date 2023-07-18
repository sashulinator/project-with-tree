import { Dictionary, DictionaryEvents } from './dictionary'

import { Emitter } from './emitter'
import { Notifier } from '../notifier'
import { Events } from './types/events'
import { EventNotifiers } from './types/event-notifiers'

export type EDEvents<TItem, E extends Events> = {
  [K in keyof E]: {
    item: TItem
    eventName: K
    value: E[K]
  }
}

export class EmitterDictionary<TItem extends Emitter<ItemEvents>, ItemEvents extends Events> extends Dictionary<
  TItem,
  DictionaryEvents<TItem> & EDEvents<TItem, ItemEvents>
> {
  constructor(
    eventNotifiers: EventNotifiers<DictionaryEvents<TItem> & EDEvents<TItem, ItemEvents>>,
    itemList: TItem[],
    getKey: (s: TItem) => string
  ) {
    super(eventNotifiers, itemList, getKey)

    itemList.forEach((emitter) => {
      const entries: [keyof ItemEvents, Notifier<ItemEvents[keyof ItemEvents]>][] = Object.entries(
        emitter.eventNotifiers
      )

      entries.forEach(([eventName, notifier]) => {
        notifier.add((value) =>
          this.emit(eventName, { eventName, value, item: emitter } as (DictionaryEvents<TItem> &
            EDEvents<TItem, ItemEvents>)[keyof ItemEvents])
        )
      })
    })
  }
}
