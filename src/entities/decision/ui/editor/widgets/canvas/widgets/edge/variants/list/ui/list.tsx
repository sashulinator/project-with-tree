import { memo } from 'react'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller as CanvasController } from '../../../../../../canvas/models/controller'
import { ListController as NodeListController } from '../../../../../widgets/node'
import Edge from '../../../ui/edge'
import { Controller } from '../models/controller'

export interface Props {
  controller: Controller
  nodeList: NodeListController
  canvas: CanvasController
  select: (ids: Id[]) => void
  toggle: (id: Id) => void
}

function ListComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.controller.values().map((link) => {
        return (
          <Edge
            key={link.id}
            controller={link}
            canvas={props.canvas}
            nodeList={props.nodeList}
            list={props.controller}
            toggle={(): void => props.toggle(link.id)}
            select={(): void => props.select([link.id])}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('add', () => setTimeout(update)))
    uns.push(props.controller.on('remove', () => setTimeout(update)))
    uns.push(props.controller.on('update', () => setTimeout(update)))
    uns.push(props.controller.on('jointEditingId', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
