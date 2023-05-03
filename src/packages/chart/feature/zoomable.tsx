/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useWheel } from '@use-gesture/react'

import { select as d3select, zoom as d3zoom, zoomIdentity } from 'd3'
import React, { useLayoutEffect, useRef } from 'react'

import { State } from '~/packages/chart'
import { Any, isNull } from '~/utils/core'

interface ZoomableProps {
  state: State<unknown, Any>
  children: (props: Any) => React.ReactNode
}

export function Zoomable(props: ZoomableProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)

  useLayoutEffect(() => {
    if (svgRef.current === null) return

    function wheeled(event: WheelEvent): void {
      event.preventDefault()
      event.stopPropagation()
      const ret = props.state.scale + event.deltaY / 777
      if (ret > 1 || ret < 0.1) return
      props.state.setScale(ret)
    }

    svgRef.current.addEventListener('wheel', wheeled)

    return () => svgRef.current?.removeEventListener('wheel', wheeled)
  })

  return <>{props.children({ ref: svgRef })}</>
}

Zoomable.displayName = 'Zoomable'
