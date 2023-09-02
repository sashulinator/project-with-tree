import { memo } from 'react'

import { Id, Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller } from '..'
import Link from '../../..'
import { NodeListController } from '../../../../../../..'

export interface Props {
  state: Controller
  nodeList: NodeListController
  canvasTranslate: Position
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
            key={link.id}
            toggle={(): void => props.toggle(link.id)}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
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
    uns.push(props.state.on('editingId', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
