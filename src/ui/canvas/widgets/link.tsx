import React from 'react'

import { Position } from '~/abstract/canvas'
import LinkMousePositionable from '~/abstract/canvas/widgets/link/features/mouse-positionable'
import AbstractLink from '~/abstract/canvas/widgets/link/ui/link'
import { Offset } from '~/utils/core'

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
export function Link(props: LinkProps): JSX.Element {
  const { sourcePosition, targetPosition, sourceOffset, targetOffset, scale, canvasTranslate, ...pathProps } = props

  return (
    <LinkMousePositionable enabled={!sourcePosition || !targetPosition} scale={scale} canvasTranslate={canvasTranslate}>
      {({ mousePosition }): JSX.Element => {
        return (
          <AbstractLink
            {...pathProps}
            sourcePosition={getPosition(sourcePosition, sourceOffset) || mousePosition}
            targetPosition={getPosition(targetPosition, targetOffset) || mousePosition}
          />
        )
      }}
    </LinkMousePositionable>
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
