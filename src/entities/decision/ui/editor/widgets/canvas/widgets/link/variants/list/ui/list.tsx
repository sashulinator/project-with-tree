import { memo } from 'react'

import { Id, Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '..'
import Link from '../../..'
import { NodeListController } from '../../../../../../..'

export interface Props {
  state: Controller
  nodeListController: NodeListController
  canvasTranslate: Position
  scale: number
  selectLinks: (ids: Id[]) => void
}

function ListComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((linkController) => {
        return (
          <Link
            key={linkController.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            nodeList={props.nodeListController}
            state={linkController}
            listState={props.state}
            selectLinks={props.selectLinks}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('add', () => setTimeout(update)))
    uns.push(props.state.on('remove', () => setTimeout(update)))
    uns.push(props.state.on('update', () => setTimeout(update)))
    uns.push(props.state.on('editingId', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
