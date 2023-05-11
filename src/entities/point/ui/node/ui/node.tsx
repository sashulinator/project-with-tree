import './node.css'

import clsx from 'clsx'
import React from 'react'

import { State as ItemState } from '~/widgets/chart-item'

import { Point } from '../../../../point/types/point'

export interface NodeProps {
  state: ItemState<Point>
  isSelected: boolean
}

export default function Node(props: NodeProps): JSX.Element {
  const { width, height, data } = props.state

  return (
    <foreignObject width={width} height={height}>
      <div className={clsx('PointNode', props.isSelected && '--selected')} style={{ width, height }}>
        <div className='name'>{props.state.data.name}</div>
        {data.links?.map((link) => {
          return <div key={link.id}>{link.name}</div>
        })}
      </div>
    </foreignObject>
  )
}
