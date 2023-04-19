import { LayoutState } from '~/entities/layout'
import { isLinkedLayout } from '~/entities/layout/lib/is/linked-layout'
import { Id } from '~/utils/core'

import Item from './item'
import LinkedItem from './linked-item'

interface FactoryProps {
  id: Id
  layoutState: LayoutState
}

export default function Factory(props: FactoryProps): JSX.Element {
  const item = props.layoutState.items[props.id]

  if (isLinkedLayout(item)) {
    return <LinkedItem id={props.id} layoutState={props.layoutState} />
  }

  return <Item id={props.id} layoutState={props.layoutState} />
}
