import { createElement, useMemo } from 'react'

import { Dictionary, Id, c } from '~/utils/core'

import { Controller } from '../models/controller'

List.displayName = 'a-List'

export type ItemProps<TItem, P extends Dictionary> = {
  item: TItem
  controller: Controller<TItem>
  id: Id
} & P

export interface ListProps<TItem, P extends Dictionary> extends React.HTMLAttributes<HTMLUListElement> {
  itemProps: P
  list: TItem[]
  controller?: Controller<TItem>
  getItemId: (item: TItem) => Id
  renderItem: (props: ItemProps<TItem, P>) => JSX.Element | null
}

export default function List<TItem, P extends Dictionary>(props: ListProps<TItem, P>): JSX.Element {
  const { controller: propController, itemProps, list, getItemId, renderItem, ...listProps } = props

  const controller = useMemo(() => propController || new Controller(list, getItemId), [props.controller, list])

  const children = useMemo(() => {
    return list.map((item) => {
      const id = getItemId(item)
      return createElement(renderItem, { ...itemProps, controller, item, id, key: id })
    })
  }, [props.controller, list])

  return (
    <ul {...listProps} className={c(props.className, List.displayName)}>
      {children}
    </ul>
  )
}
