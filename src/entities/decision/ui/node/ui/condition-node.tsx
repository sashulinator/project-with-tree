import React from 'react'

import { State as ItemState } from '~/widgets/chart-item'

import { Item } from '../../../types/item'
import { linkOut } from '../constants/link-out'
import { getLinkOutProps } from '../lib/get-link-out-position'

interface ConditionNodeProps {
  state: ItemState<Item>
  isSelected: boolean
}

const links = [
  {
    fill: 'red',
  },
  {
    fill: 'green',
  },
]

export default function ConditionNode(props: ConditionNodeProps): JSX.Element {
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
      {links.map((link, i) => {
        return <circle key={link.fill} {...link} {...getLinkOutProps(props.state, i)} />
      })}
    </>
  )
}
