import './node.css'

import React from 'react'
import { c } from '~/utils/core'
import { NodeState } from '../../../../..'

Node.displayName = 'decisionEditor-w-PointPanel-w-Node'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: NodeState
}

export default function Node(props: Props): JSX.Element {
  return (
    <button {...props} className={c(props.className, Node.displayName)}>
      {props.state.title.value}
    </button>
  )
}
