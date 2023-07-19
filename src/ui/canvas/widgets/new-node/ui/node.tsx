import './node.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef, useRef } from 'react'

import { Id, Position } from '~/utils/core'

import { Item } from '../../item'
import { GestureDragEvent } from '../../item/ui/item'

NodeComponent.displayName = 'ui-Canvas-w-Node'

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
  x: number | string
  y: number | string
  nodeTitle: React.ReactNode
  titleProps?: React.HTMLAttributes<HTMLDivElement>
  nodeDescription?: React.ReactNode | undefined
  width?: number | undefined
  height?: number | undefined
  left?: React.ReactNode
  right?: React.ReactNode
  position: Position
  lastPosition: Position
  scale: number
  children: React.ReactNode
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Элемент Canvas с фичами
 * 1. Title
 * 2. Перетаскивание по тайтлу
 * 3. Стили позиционирования
 */
export function NodeComponent(props: NodeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { nodeTitle, titleProps, nodeDescription, left, right, dataId, ...itemProps } = props

  const rulesRef = useRef(null)

  return (
    <Item {...itemProps} dataId={dataId} ref={ref} className={clsx(props.className, 'ui-Node')}>
      <div className={clsx('container')}>
        {left}
        <div className='content'>
          <div {...titleProps} className={clsx('title', titleProps?.className)}>
            {nodeTitle}
          </div>
          <div className={clsx('description')}>{nodeDescription}</div>
          {props.children}
        </div>
        <div ref={rulesRef}>{right}</div>
      </div>
    </Item>
  )
}

const Node = forwardRef(NodeComponent)
export { Node }
