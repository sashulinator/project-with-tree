import './node.css'

import clsx from 'clsx'
import React, { useRef } from 'react'
import useMeasure from 'react-use-measure'

import { IsDragEvent, Position } from '~/abstract/canvas'

import { Item } from '../../item'

export interface NodeProps extends React.HTMLAttributes<SVGForeignObjectElement> {
  nodeTitle: React.ReactNode
  nodeDescription?: React.ReactNode | undefined
  width: number
  height: number
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
export function Node(props: NodeProps): JSX.Element {
  const { nodeTitle, nodeDescription, ...foreignObjectProps } = props

  const titleRef = useRef(null)
  const [containerRef, { height: containerHeight }] = useMeasure()
  const height = Math.max(containerHeight, foreignObjectProps.height)

  console.log(containerHeight)

  return (
    <Item {...foreignObjectProps} height={height} className={clsx(props.className, 'ui-Node')} isDrag={isDrag}>
      <div className={clsx('container')} ref={containerRef}>
        <div className={clsx('title')} ref={titleRef}>
          {nodeTitle}
        </div>
        <div className={clsx('description')}>{nodeDescription}</div>
        {props.children}
      </div>
    </Item>
  )

  function isDrag(event: IsDragEvent): boolean {
    const isDraggable = event.event.target === titleRef.current
    if (isDraggable) props.isDrag?.(event)
    return isDraggable
  }
}

Node.displayName = 'UICanvasNode'
