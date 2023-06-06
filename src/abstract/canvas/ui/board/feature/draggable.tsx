/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useDrag } from '@use-gesture/react'
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types'

import React from 'react'

import { Position } from '~/abstract/canvas'

export interface BoardDraggableProps {
  lastTranslate: Position
  onTranslate: (x: number, y: number, last: boolean) => void
  children: (props: ReactDOMAttributes) => React.ReactNode
}

export function BoardDraggable(props: BoardDraggableProps): JSX.Element {
  const { children } = props

  const dragBind = useDrag((event): void => {
    event.event.preventDefault()

    const x = (props.lastTranslate?.x || 0) + event.movement[0]
    const y = (props.lastTranslate?.y || 0) + event.movement[1]

    props.onTranslate(x, y, event.last)
  })

  return <>{children({ ...dragBind() })}</>
}

BoardDraggable.displayName = 'CanvasBoardDraggable'
