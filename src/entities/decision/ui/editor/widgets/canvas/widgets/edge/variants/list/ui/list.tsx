import { memo } from 'react'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '..'
import Link from '../../..'
import { CanvasController, NodeListController } from '../../../../../../..'

export interface Props {
  state: Controller
  nodeList: NodeListController
  canvas: CanvasController
  scale: number
  selectLinks: (ids: Id[]) => void
  toggle: (id: Id) => void
}

function ListComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((link) => {
        return (
          <Link
            canvas={props.canvas}
            key={link.id}
            toggle={(): void => props.toggle(link.id)}
            scale={props.scale}
            nodeList={props.nodeList}
            state={link}
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
    uns.push(props.state.on('jointEditingId', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
