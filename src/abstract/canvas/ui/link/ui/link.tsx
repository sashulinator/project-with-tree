import './link.css'

import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { Position } from '../../../types/position'

export interface LinkProps extends React.HTMLAttributes<SVGPathElement> {
  sourcePosition: Position | null
  targetPosition: Position | null
}

/**
 * Отрисовывает path если sourcePosition и targetPosition переданы, иначе вернет null
 */
function LinkComponent(props: LinkProps, ref: ForwardedRef<SVGPathElement>): JSX.Element | null {
  const { sourcePosition: s, targetPosition: t, ...pathProp } = props

  const path = drawPath()

  if (!path) return null

  return <path d={path} strokeWidth={2} {...pathProp} className={clsx(props.className, 'a-CanvasLink')} ref={ref} />

  // Private

  function drawPath(): string | null {
    if (s === null || t === null) return null

    return `M${s.x},${s.y}L${t.x},${t.y}`
  }
}

const Link = forwardRef(LinkComponent)
Link.displayName = 'AbstarctCanvasLink'
export default Link
