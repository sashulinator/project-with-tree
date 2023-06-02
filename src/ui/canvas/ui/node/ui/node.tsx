import clsx from 'clsx'
import React, { useRef } from 'react'

import { IsDragEvent, Position } from '~/widgets/canvas'

import { Item } from '../../item'

export interface NodeProps extends React.HTMLAttributes<SVGForeignObjectElement> {
  nodeTitle: React.ReactNode
  width: number
  height: number
  position: Position
  lastPosition: Position
  scale: number
  children: React.ReactNode
  onMove: (x: number, y: number, isLast: boolean) => void
  isDrag: (event: IsDragEvent) => boolean
}

/**
 * Элемент Canvas с фичами
 * 1. Title
 * 2. Перетаскивание по тайтлу
 * 3. Стили позиционирования
 */
export default function Node(props: NodeProps): JSX.Element {
  const titleRef = useRef(null)

  return (
    <Item className={clsx(props.className, 'ui-Node')} {...props} isDrag={isDrag}>
      <div className={clsx('contaner')}>
        <div className={clsx('title')} ref={titleRef}>
          {props.nodeTitle}
        </div>
      </div>
    </Item>
  )

  function isDrag(event: IsDragEvent): boolean {
    return event.event.target === titleRef.current
  }
}

Node.displayName = 'UICanvasNode'
