import { memo } from 'react'

import { Position } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { NodeListState } from '../../../../..'
import Link from '../../..'
import { State } from '..'

export interface Props {
  state: State
  nodeListState: NodeListState
  canvasTranslate: Position
  scale: number
}

function ListComponent(props: Props): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <>
      {props.state.values().map((linkState) => {
        return (
          <Link
            key={linkState.id}
            scale={props.scale}
            canvasTranslate={props.canvasTranslate}
            nodeListState={props.nodeListState}
            state={linkState}
            listState={props.state}
          />
        )
      })}
    </>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('add', () => setTimeout(update)))
    uns.push(props.state.on('remove', () => setTimeout(update)))
    uns.push(props.state.on('update', () => setTimeout(update)))
  }
}

const List = memo(ListComponent)
export default List
