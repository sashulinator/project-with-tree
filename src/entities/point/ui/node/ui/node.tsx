import './node.css'

import { clsx } from 'clsx'

import { NodeState } from '~/entities/point'
import { emitter } from '~/shared/emitter'
import { Node as UINode } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { fns } from '~/utils/function'

emitter.emit('addTheme', { dark, light })

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  state: NodeState
  scale: number
  left?: React.ReactNode
  right?: React.ReactNode
  nodeTitle?: React.ReactNode | undefined
  nodeDescription?: React.ReactNode | undefined
  onMove?: ((x: number, y: number, isLast: boolean) => void) | undefined
}

export function Node(props: NodeProps): JSX.Element {
  const { state, scale, left, right, dataId, nodeTitle, nodeDescription, ...foreignObjectProps } = props

  useUpdate(subscribeOnUpdates)

  return (
    <UINode
      {...foreignObjectProps}
      dataId={dataId}
      ref={setRefs(state.ref.set)}
      className={clsx('point-Node', props.className)}
      nodeTitle={nodeTitle || state.point.name}
      nodeDescription={nodeDescription || state.point.description}
      position={state.position.value}
      lastPosition={state.position.last}
      scale={scale}
      onMove={fns(state.position.move, props.onMove)}
      left={left}
      right={right}
      data-id={state.id}
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
