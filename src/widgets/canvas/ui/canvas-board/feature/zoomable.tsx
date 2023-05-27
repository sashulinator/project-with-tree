/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import React, { ForwardedRef, useLayoutEffect, useRef } from 'react'

interface ZoomableProps {
  scale: number
  setScale: (scale: number) => void
  children: (props: { ref: ForwardedRef<SVGSVGElement> }) => React.ReactNode
}

export function Zoomable(props: ZoomableProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (svgRef.current === null) return

    function wheeled(event: WheelEvent): void {
      event.preventDefault()
      event.stopPropagation()
      const ret = props.scale + event.deltaY / 777
      if (ret > 1 || ret < 0.1) return
      props.setScale(ret)
    }

    svgRef.current.addEventListener('wheel', wheeled)

    return () => svgRef.current?.removeEventListener('wheel', wheeled)
  }, [props.scale])

  return <>{props.children({ ref: svgRef })}</>
}

Zoomable.displayName = 'Zoomable'
