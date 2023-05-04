/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import React, { useLayoutEffect, useRef } from 'react'

import { Any } from '~/utils/core'
import { State } from '~/widgets/chart'

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
