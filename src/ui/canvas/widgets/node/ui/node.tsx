import './node.css'

import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef, useRef } from 'react'

import { IsDragEvent } from '~/abstract/canvas'
import { Id, Position } from '~/utils/core'

import { Item } from '../../item'

export interface NodeProps extends React.HTMLAttributes<HTMLDivElement> {
  dataId: Id
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
  onMove: (x: number, y: number, isLast: boolean) => void
  isDrag?: (event: IsDragEvent) => boolean
}

/**
 * Элемент Canvas с фичами
 * 1. Title
 * 2. Перетаскивание по тайтлу
 * 3. Стили позиционирования
 */
export function NodeComponent(props: NodeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { nodeTitle, titleProps, nodeDescription, left, right, dataId, ...foreignObjectProps } = props

  const titleRef = useRef(null)

  return (
    <Item
      {...foreignObjectProps}
      dataId={dataId}
      ref={ref}
      className={clsx(props.className, 'ui-Node')}
      isDrag={isDrag}
    >
      <div className={clsx('container')}>
        {left}
        <div className='content'>
          <div ref={titleRef} {...titleProps} className={clsx('title', titleProps?.className)}>
            {nodeTitle}
          </div>
          <div className={clsx('description')}>{nodeDescription}</div>
          {props.children}
        </div>
        {right}
      </div>
    </Item>
  )

  function isDrag(event: IsDragEvent): boolean {
    const isDraggable = event.event.target === titleRef.current
    if (isDraggable) props.isDrag?.(event)
    return isDraggable
  }
}

const Node = forwardRef(NodeComponent)
Node.displayName = 'UICanvasNode'
export { Node }
