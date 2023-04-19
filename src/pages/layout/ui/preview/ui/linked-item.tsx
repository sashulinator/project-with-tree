import { useFetchLayout } from '~/api/layout/fetch'
import { LayoutState, ROOT_ID } from '~/entities/layout'
import { LinkedLayoutItem } from '~/entities/layout/types/linked-layout-item'
import { Id, assertDefined, assertNotNull } from '~/utils/core'
import { toDictionary } from '~/utils/list'

import Item from './item'

interface LinkedItemProps {
  id: Id
  layoutState: LayoutState
}

export default function LinkedItem(props: LinkedItemProps): JSX.Element {
  const linked = props.layoutState.items[props.id] as LinkedLayoutItem
  assertDefined(linked)

  const fetcher = useFetchLayout({ staleTime: Infinity }, { id: linked.linkedId })

  if (!fetcher.isSuccess) {
    return <>Fail</>
  }

  const items = toDictionary((i) => i.id, fetcher.data.data)
  assertNotNull(items)

  const layoutState: LayoutState = {
    layout: fetcher.data,
    items: items,
  }

  return <Item id={ROOT_ID} layoutState={layoutState} />
}
