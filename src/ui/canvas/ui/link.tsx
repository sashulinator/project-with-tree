import React from 'react'

import { Offset } from '~/utils/core'
import { Position } from '~/widgets/canvas'
import MousePositionable from '~/widgets/canvas/ui/link/features/mouse-positionable'
import AbstractLink from '~/widgets/canvas/ui/link/ui/link'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  scale: number
  canvasTranslate: Position
  sourcePosition: Position | undefined
  targetPosition: Position | undefined
  sourceOffset: Offset | null
  targetOffset: Offset | null
}

/**
 * Отрисовывает path если sourcePosition и targetPosition переданы
 * если один из них не передан то возьмет позицию курсора
 * если оба не переданы то ничего не отрисует
 */
export default function Link(props: LinkProps): JSX.Element {
  const { sourcePosition, targetPosition, sourceOffset, targetOffset, scale, canvasTranslate, ...pathProps } = props

  return (
    <MousePositionable enabled={!sourcePosition || !targetPosition} scale={scale} canvasTranslate={canvasTranslate}>
      {({ mousePosition }): JSX.Element => {
        return (
          <AbstractLink
            {...pathProps}
            sourcePosition={getPosition(sourcePosition, sourceOffset) || mousePosition}
            targetPosition={getPosition(targetPosition, targetOffset) || mousePosition}
          />
        )
      }}
    </MousePositionable>
  )

  // Private

  function getPosition(position: Position | undefined, offset: Offset | null): Position | null {
    if (position === undefined) return null
    offset = offset || { left: 0, top: 0 }
    const x = position.x + offset.left
    const y = position.y + offset.top
    return { x, y }
  }
}
