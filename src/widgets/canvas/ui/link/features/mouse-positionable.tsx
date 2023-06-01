import React, { useEffect, useState } from 'react'

import { Position } from '../../../types/position'

export interface CanvasItemSelectableProps {
  enabled: boolean
  canvasTranslate: Position
  scale: number
  children: (props: { mousePosition: null | Position }) => React.ReactNode
}

export default function MousePositionable(props: CanvasItemSelectableProps): JSX.Element {
  const [clientPosition, setClientPosition] = useState<null | Position>(null)

  useEffect(subscribeOnMouseMove, [props.enabled])

  return <>{props.children({ mousePosition: getMousePosition() })}</>

  // Private

  function getMousePosition(): Position | null {
    if (clientPosition === null) return null
    return {
      x: (clientPosition.x - props.canvasTranslate.x) / props.scale,
      y: (clientPosition.y - props.canvasTranslate.y) / props.scale,
    }
  }

  function subscribeOnMouseMove(): (() => void) | void {
    function updateMousePosition(ev: MouseEvent): void {
      const x = Math.round(ev.clientX)
      const y = Math.round(ev.clientY)
      setClientPosition({ x, y })
    }

    if (!props.enabled) {
      setClientPosition(null)
      return
    }

    document.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', updateMousePosition)

    return () => {
      document.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', updateMousePosition)
    }
  }
}
