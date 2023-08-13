import mitt, { Emitter } from 'mitt'
import { RefObject } from 'react'

import { isDev } from '~/utils/core/is/dev'
import { isHTMLElement } from '~/utils/dom/is/is-htmlelement'
import { remove } from '~/utils/id-array'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { ItemState } from '../types/item-state'
import { Key } from '../types/key'

export interface CreateMittProps<T> {
  data: T[]
  checkedRef: RefObject<Key[]>
  selectedRef: RefObject<Key[]>
  map: Map<Key | HTMLLIElement, ItemState<T>>
  onCheckRef: RefObject<((checked: Key[]) => void) | undefined>
  onCheckOneRef: RefObject<((checked: Key) => void) | undefined>
  onUncheckOneRef: RefObject<((checked: Key) => void) | undefined>
  onSelectRef: RefObject<((selected: Key[]) => void) | undefined>
  onSelectOneRef: RefObject<((selected: Key) => void) | undefined>
  onUnselectOneRef: RefObject<((selected: Key) => void) | undefined>
  onFocusRef: RefObject<((item: T, i: number, element: HTMLLIElement | undefined | null) => void) | undefined>
  onBlurRef: RefObject<(() => void) | undefined>
  getItemKey: (item: T, data: T[]) => Key
}

export function createMitt<T>(props: CreateMittProps<T>): Emitter<Events> {
  const m = mitt<Events>()

  m.on(EventNames.setChecked, (checked) => {
    props.onCheckRef.current?.(checked)
  })
  m.on(EventNames.checkOne, (key) => {
    if (props.checkedRef.current === null) return
    m.emit(EventNames.setChecked, [...props.checkedRef.current, key])
    props.onCheckOneRef.current?.(key)
  })
  m.on(EventNames.uncheckOne, (key) => {
    if (props.checkedRef.current === null) return
    m.emit(EventNames.setChecked, remove(key, props.checkedRef.current))
    props.onUncheckOneRef.current?.(key)
  })

  m.on(EventNames.setSelected, (selected) => {
    props.onSelectRef.current?.(selected)
  })
  m.on(EventNames.selectOne, (key) => {
    if (props.selectedRef.current === null) return
    m.emit(EventNames.setSelected, [...props.selectedRef.current, key])
    props.onSelectOneRef.current?.(key)
  })
  m.on(EventNames.unselectOne, (key) => {
    if (props.selectedRef.current === null) return
    m.emit(EventNames.setSelected, remove(key, props.selectedRef.current))
    props.onUnselectOneRef.current?.(key)
  })

  m.on(EventNames.focus, (key) => {
    key =
      key ??
      (props.checkedRef.current?.[0] || props.selectedRef.current?.[0] || props.getItemKey(props.data[0], props.data))

    const item = props.map.get(key)
    if (!item && isDev()) {
      throw new Error('MapItem not found')
    }
    if (!item) return
    item.elementRef.current?.focus()
    props.onFocusRef.current?.(item.item, item.index, item.elementRef.current)
  })

  m.on(EventNames.unfocus, () => {
    if (isHTMLElement(document.activeElement)) {
      document.activeElement.blur()
    }
    props.onBlurRef.current?.()
  })

  return m
}
