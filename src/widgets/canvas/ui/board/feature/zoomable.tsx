import React, { ForwardedRef, useLayoutEffect, useRef } from 'react'

import { assertNotNull } from '~/utils/core'

export interface CanvasBoardZoomableProps {
  scale: number
  setScale: (scale: number) => void
  children: (props: { ref: ForwardedRef<SVGSVGElement> }) => React.ReactNode
}

export function BoardZoomable(props: CanvasBoardZoomableProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)

  useLayoutEffect(subscribeOnWheel, [props.scale])

  return <>{props.children({ ref: svgRef })}</>

  // Private

  function subscribeOnWheel(): () => void {
    function wheeled(event: WheelEvent): void {
      event.preventDefault()
      event.stopPropagation()
      const newScale = props.scale + event.deltaY / 777
      const ret = newScale > 1 ? 1 : newScale < 0.1 ? 0.1 : newScale
      props.setScale(ret)
    }

    assertNotNull(svgRef.current)
    svgRef.current.addEventListener('wheel', wheeled)
    return () => svgRef.current?.removeEventListener('wheel', wheeled)
  }
}

BoardZoomable.displayName = 'CanvasBoardZoomable'
