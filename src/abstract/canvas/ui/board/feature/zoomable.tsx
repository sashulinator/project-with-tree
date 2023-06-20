import { useWheel } from '@use-gesture/react'

import React from 'react'

import { Any, Position } from '~/utils/core'

export interface CanvasBoardZoomableProps {
  scale: number
  translate: Position
  setScale: (scale: number) => void
  setTranslate: (x: number, y: number, last: boolean) => void
  children: (props: Any) => React.ReactNode
}

export function BoardZoomable(props: CanvasBoardZoomableProps): JSX.Element {
  const wheelBind = useWheel(
    (ev): void => {
      ev.event.stopPropagation()
      const newScale = props.scale + ev.event.deltaY / 777
      const retScale = newScale > 1 ? 1 : newScale < 0.1 ? 0.1 : newScale
      const deltaScale = retScale - props.scale
      const x = props.translate.x - deltaScale * ev.event.clientX
      const y = props.translate.y - deltaScale * ev.event.clientY

      props.setScale(retScale)
      props.setTranslate(x, y, ev.last)
    },
    { preventDefault: true }
  )

  return <>{props.children(wheelBind())}</>
}

BoardZoomable.displayName = 'CanvasBoardZoomable'
