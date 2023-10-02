import './node.css'

import React, { ForwardedRef, forwardRef, useRef } from 'react'

import { Id, c } from '~/utils/core'

import { GestureDragEvent, Item } from '../../item'

NodeComponent.displayName = 'decision-Editor-w-Canvas-w-Node'

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  nodeTitle: React.ReactNode
  titleProps?: React.HTMLAttributes<HTMLDivElement>
  nodeDescription?: React.ReactNode | undefined
  x: number | string
  y: number | string
  left?: React.ReactNode
  right?: React.ReactNode
  children: React.ReactNode
  onGestureDrag: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 * 1. Title
 * 2. Перетаскивание по тайтлу
 * 3. Стили позиционирования
 */
function NodeComponent(props: NodeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { nodeTitle, titleProps, nodeDescription, left, right, dataId, ...itemProps } = props

  const rulesRef = useRef(null)

  return (
    <Item {...itemProps} dataId={dataId} ref={ref} className={c(props.className, 'ui-Node')}>
      <div className={c('container')}>
        {left}
        <div className='content'>
          <div {...titleProps} className={c('title', titleProps?.className)}>
            {nodeTitle}
          </div>
          <div className={c('description')}>{nodeDescription}</div>
          {props.children}
        </div>
        <div ref={rulesRef}>{right}</div>
      </div>
    </Item>
  )
}

const Node = forwardRef(NodeComponent)
Node.displayName = NodeComponent.displayName
export { Node }
