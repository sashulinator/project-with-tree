import React, { useEffect, useState } from 'react'

import { Position } from '../../../types/position'

export interface CanvasItemSelectableProps {
  enabled: boolean
  children: (props: { mousePosition: null | Position }) => React.ReactNode
}

export default function MousePositionable(props: CanvasItemSelectableProps): JSX.Element {
  const [mousePosition, setMousePosition] = useState<null | Position>(null)

  useEffect(subscribeOnMouseMove, [props.enabled])

  return <>{props.children({ mousePosition })}</>

  // Private

  function subscribeOnMouseMove(): (() => void) | void {
    function updateMousePosition(ev: MouseEvent): void {
      const x = Math.round(ev.clientX)
      const y = Math.round(ev.clientY)
      setMousePosition({ x, y })
    }

    if (!props.enabled) {
      setMousePosition(null)
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
