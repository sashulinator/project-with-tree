import { useEffect } from 'react'

import { EventNames, LayoutItem, LayoutState, components } from '~/entities/layout'
import { Id, assertDefined } from '~/utils/core'
import { useForceUpdate } from '~/utils/hooks'

import Factory from './factory'

interface ItemProps {
  id: Id
  layoutState: LayoutState
}

export default function Item(props: ItemProps): JSX.Element {
  const item = props.layoutState.items[props.id] as LayoutItem
  assertDefined(item)

  const componentMapItem = components[item.componentName]
  const force = useForceUpdate()

  useEffect(() => {
    props.layoutState.mitt?.on(EventNames.setItem, (eItem) => {
      if (eItem.id === item.id) force()
    })
  }, [])

  if (componentMapItem === undefined) {
    return <>Component {item.componentName} does not exists</>
  }

  const Component = componentMapItem.component

  return (
    <Component {...item.props}>
      {item.children?.map((id) => {
        return <Factory key={id} id={id} layoutState={props.layoutState} />
      })}
    </Component>
  )
}
