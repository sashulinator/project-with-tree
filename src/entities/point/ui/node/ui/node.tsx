import './node.css'

import clsx from 'clsx'

import { IsDragEvent } from '~/abstract/canvas'
import { NodeState } from '~/entities/point/ui/node/state'
import { Node as UINode } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'

export interface NodeProps {
  state: NodeState
  scale: number
  left?: React.ReactNode
  children?: React.ReactNode
  isDrag?: (event: IsDragEvent) => boolean
}

export function Node(props: NodeProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <UINode
      left={props.left}
      className={clsx('point-Node')}
      nodeTitle={props.state.point.name}
      nodeDescription={props.state.point.description}
      position={props.state.position.value}
      lastPosition={props.state.position.last}
      scale={props.scale}
      onMove={props.state.position.move}
    >
      {props.children}
    </UINode>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('setPosition', update))
    uns.push(props.state.on('setWidth', update))
    uns.push(props.state.on('setHeight', update))
  }
}
