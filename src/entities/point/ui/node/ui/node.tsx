import './node.css'

import clsx from 'clsx'

import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { NodeState } from '~/entities/point/ui/node/state'
import { Node as UINode } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

export interface NodeProps extends React.HTMLAttributes<SVGForeignObjectElement> {
  state: NodeState
  scale: number
  left?: React.ReactNode
  right?: React.ReactNode
  linkStates: LinkStateDictionary
}

export function Node(props: NodeProps): JSX.Element {
  const { state, scale, left, right, ...foreignObjectProps } = props

  useUpdate(subscribeOnUpdates)

  return (
    <UINode
      {...foreignObjectProps}
      ref={setRefs(state.ref.set)}
      className={clsx('point-Node')}
      nodeTitle={state.point.name}
      nodeDescription={state.point.description}
      position={state.position.value}
      lastPosition={state.position.last}
      scale={scale}
      onMove={state.position.move}
      left={left}
      right={right}
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
