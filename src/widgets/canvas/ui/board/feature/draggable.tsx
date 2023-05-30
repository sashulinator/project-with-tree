/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'

import React from 'react'

import { CanvasState } from '~/entities/decision'

export interface CanvasBoardDraggableProps {
  state: CanvasState
  children: (props: ReactDOMAttributes) => React.ReactNode
}

export function CanvasBoardDraggable(props: CanvasBoardDraggableProps): JSX.Element {
  const { children } = props

  const dragBind = useDrag((event): void => {
    event.event.preventDefault()

    const x = (props.state.translate.last?.x || 0) + event.movement[0]
    const y = (props.state.translate.last?.y || 0) + event.movement[1]

    props.state.translate.move(x, y, event.last)
  })

  return <>{children({ ...dragBind() })}</>
}

CanvasBoardDraggable.displayName = 'CanvasBoardDraggable'
