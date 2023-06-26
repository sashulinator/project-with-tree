import { select, zoom, zoomIdentity } from 'd3'
import React, { ForwardedRef, useLayoutEffect, useRef } from 'react'

import { Position, assertNotNull } from '~/utils/core'

export interface CanvasBoardZoomableProps {
  scale: number
  translate: Position
  setScale: (scale: number) => void
  setTranslate: (x: number, y: number, last: boolean) => void
  children: (props: { ref: ForwardedRef<Element> }) => React.ReactNode
}

export function BoardZoomable(props: CanvasBoardZoomableProps): JSX.Element {
  const ref = useRef<Element>(null)

  useLayoutEffect(() => {
    function zoomed(zEvent: { transform: Record<'k' | 'x' | 'y', number> }): void {
      props.setScale(zEvent.transform.k)
      props.setTranslate(zEvent.transform.x, zEvent.transform.y, false)
    }

    const zoomBehavior = zoom()
      .on('zoom', zoomed)
      .filter((ev: WheelEvent | MouseEvent) => {
        if (ev.type === 'wheel') {
          return true
        }
        return ev.target === ref.current
      })
    const identity = zoomIdentity.translate(props.translate.x, props.translate.y).scale(props.scale)

    assertNotNull(ref.current)
    const selection = select(ref.current)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    selection.call(zoomBehavior, identity)
  }, [props.scale, props.translate.x, props.translate.y])

  return <>{props.children({ ref })}</>
}

BoardZoomable.displayName = 'CanvasBoardZoomable'
