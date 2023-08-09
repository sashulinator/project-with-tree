import './node.css'

import React from 'react'
import { Id, c } from '~/utils/core'
import { NodeListState, NodeState } from '../../../../..'
import { useUpdate } from '~/utils/hooks'
import { fns } from '~/utils/function'

Node.displayName = 'decisionEditor-w-PointPanel-w-Node'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: NodeState
  nodeListState: NodeListState
  centerNode: (id: Id) => void
}

export default function Node(props: Props): JSX.Element {
  const { nodeListState, state, centerNode, ...buttonProps } = props

  useUpdate(subscribeOnUpdates)

  const selected = nodeListState.selection.isSelected(props.state.id)

  return (
    <button
      {...buttonProps}
      onClick={onClick}
      className={c(props.className, Node.displayName, selected && `--selected`)}
    >
      {state.title.value}
    </button>
  )

  // Private

  function onClick(e: React.MouseEvent): void {
    if (e.metaKey) {
      nodeListState.selection.toggle(state.id)
    } else {
      nodeListState.selection.set(new Set([state.id]))
      centerNode(state.id)
    }
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
  }
}
