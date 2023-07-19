import './node.css'

import { clsx } from 'clsx'

import { NodeState } from '~/entities/decision/ui/editor/widgets/_node'
import { emitter } from '~/shared/emitter'
import { Node as UINode } from '~/ui/canvas'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { dark } from '../../../themes/dark'
import { light } from '../../../themes/light'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

emitter.emit('addTheme', { dark, light })

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  state: NodeState
  x: number | string
  y: number | string
  left?: React.ReactNode
  right?: React.ReactNode
  nodeTitle?: React.ReactNode | undefined
  nodeDescription?: React.ReactNode | undefined
  onGestureDrug: (event: GestureDragEvent) => void
}

export function Node(props: NodeProps): JSX.Element {
  const { state, left, right, dataId, nodeTitle, nodeDescription, ...foreignObjectProps } = props

  useUpdate(subscribeOnUpdates)

  return (
    <UINode
      {...foreignObjectProps}
      dataId={dataId}
      ref={setRefs(state.ref.set)}
      className={clsx('point-Node', props.className)}
      nodeTitle={nodeTitle || state.point.name}
      nodeDescription={nodeDescription || state.point.description}
      left={left}
      right={right}
      data-id={state.id}
    >
      {props.children}
    </UINode>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('position', update))
  }
}
