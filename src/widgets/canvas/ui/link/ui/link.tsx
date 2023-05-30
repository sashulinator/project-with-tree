import clsx from 'clsx'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'

import { Position } from '../../../types/position'

export interface CanvasLinkProps extends React.HTMLAttributes<SVGPathElement> {
  sourcePosition: Position | null
  targetPosition: Position | null
  scale: number
  canvasTranslate: Position
}

/**
 * Отрисовывает Path по sourcePosition и targetPosition.
 * Если один из них не передан, то берет позицию мыши
 * @param props
 * @param ref
 * @returns
 */
function CanvasLinkComponent(props: CanvasLinkProps, ref: ForwardedRef<SVGPathElement>): JSX.Element | null {
  const { sourcePosition, targetPosition, scale, canvasTranslate, ...pathProp } = props

  const [mousePosition, setMousePosition] = useState<null | Position>(null)

  const path = drawPath()

  useEffect(subscribeOnMouseMove)

  if (!path) return null

  return <path d={path} strokeWidth={2} {...pathProp} className={clsx('CanvasLink', props.className)} ref={ref} />

  // Private

  function subscribeOnMouseMove(): () => void {
    function updateMousePosition(ev: MouseEvent): void {
      const x = Math.round(ev.clientX)
      const y = Math.round(ev.clientY)
      setMousePosition({ x, y })
    }

    if (!sourcePosition || !targetPosition) {
      document.addEventListener('mousemove', updateMousePosition)
      document.addEventListener('mouseenter', updateMousePosition)
    }

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', updateMousePosition)
    }
  }

  function drawPath(): string | null {
    const s = getPosition(sourcePosition)
    const t = getPosition(targetPosition)

    if (s === null || t === null) return null

    return `M${s.x},${s.y}L${t.x},${t.y}`
  }

  function getPosition(position: Position | null): Position | null {
    if (position) return position
    if (mousePosition === null) return null

    return {
      x: (mousePosition.x - canvasTranslate.x) / scale,
      y: (mousePosition.y - canvasTranslate.y) / scale,
    }
  }
}

const CanvasLink = forwardRef(CanvasLinkComponent)
CanvasLink.displayName = 'CanvasLinkComponent'
export default CanvasLink
