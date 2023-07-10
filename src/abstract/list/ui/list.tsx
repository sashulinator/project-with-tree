import { c, Id } from '~/utils/core'
import { State } from '../models/state'
import { createElement, useMemo } from 'react'

List.displayName = 'a-List'

export interface ItemProps<TItem> {
  item: TItem
  state: State<TItem>
  id: Id
}

export interface ListProps<TItem> extends React.HTMLAttributes<HTMLUListElement> {
  items: TItem[]
  state?: State<TItem>
  getItemId: (item: TItem) => Id
  renderItem: (props: ItemProps<TItem>) => JSX.Element | null
}

export default function List<TItem>(props: ListProps<TItem>): JSX.Element {
  const { state: propState, items, getItemId, renderItem, ...listProps } = props

  const state = useMemo(() => propState || new State({ getItemId }), [props.state, items])

  const children = useMemo(() => {
    return items.map((item) => {
      const id = getItemId(item)
      return createElement(renderItem, { state, item, id, key: id })
    })
  }, [props.state, items])

  return (
    <ul {...listProps} className={c(props.className, List.displayName)}>
      {children}
    </ul>
  )
}
