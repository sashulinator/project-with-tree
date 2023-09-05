import './node.css'

import React from 'react'

import { Id, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { NodeController, NodeListController } from '../../../../..'

Node.displayName = 'decision-Editor-w-LeftPanel-w-Node'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  controller: NodeController
  nodeListController: NodeListController
  centerNode: (id: Id) => void
  selectNodes: (ids: Id[]) => void
}

export default function Node(props: Props): JSX.Element {
  const { nodeListController, controller: state, centerNode, ...buttonProps } = props

  useUpdate(subscribeOnUpdates)

  const selected = nodeListController.selection.isSelected(props.controller.id)

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
      nodeListController.selection.toggle(state.id)
      props.selectNodes([...nodeListController.selection.value])
    } else {
      props.selectNodes([state.id])
      centerNode(state.id)
    }
  }

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListController.on('selection', update))
  }
}
