import React from 'react'

import AbstractLink from '~/abstract/canvas/widgets/edge/ui/edge'
import { Offset, Position } from '~/utils/core'

export interface Props extends React.SVGAttributes<SVGPathElement> {
  sourcePosition: Position | undefined
  targetPosition: Position | undefined
  sourceOffset: Offset | null
  targetOffset: Offset | null
}

/**
 * Edge компонент
 * Позволяет добавить Offset относительно Position
 */
export default function Edge(props: Props): JSX.Element {
  const { sourcePosition, targetPosition, sourceOffset, targetOffset, ...pathProps } = props

  return (
    <AbstractLink
      {...pathProps}
      sourcePosition={getPosition(sourcePosition, sourceOffset)}
      targetPosition={getPosition(targetPosition, targetOffset)}
    />
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
