import './link.css'

import { ForwardedRef, forwardRef } from 'react'

import { Position, c } from '~/utils/core'

export interface Props extends React.SVGAttributes<SVGPathElement> {
  sourcePosition: Position | null
  targetPosition: Position | null
}

/**
 * Отрисовывает path если sourcePosition и targetPosition переданы, иначе вернет null
 */
function LinkComponent(props: Props, ref: ForwardedRef<SVGPathElement>): JSX.Element | null {
  const { sourcePosition: s, targetPosition: t, ...pathProp } = props

  const path = drawPath()

  if (!path) return null

  return <path d={path} strokeWidth={2} {...pathProp} className={c(props.className, 'a-CanvasLink')} ref={ref} />

  // Private

  function drawPath(): string | null {
    if (s === null || t === null) return null
    const start = s
    const end = t
    const startLine = { x: start.x + 30, y: start.y }
    const endLine = { x: end.x - 30, y: end.y }

    return `M ${start.x} ${start.y} L ${startLine.x} ${startLine.y} L ${endLine.x} ${endLine.y} L ${end.x} ${end.y}`
  }
}

const Link = forwardRef(LinkComponent)
Link.displayName = 'AbstractCanvasLink'
export default Link
