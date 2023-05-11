import React from 'react'

import { State as ItemState } from '~/widgets/chart-item'

import { Point } from '../../../../point/types/point'

export interface NodeProps {
  state: ItemState<Point>
  isSelected: boolean
}

export default function Node(props: NodeProps): JSX.Element {
  return (
    <>
      <rect
        width={props.state.width}
        height={props.state.height}
        fill={'yellow'}
        stroke='black'
        strokeWidth={props.isSelected ? '1px' : 0}
      />
      <text x={20} y={props.state.height - 30}>
        {props.state.data.id}
      </text>
    </>
  )
}
