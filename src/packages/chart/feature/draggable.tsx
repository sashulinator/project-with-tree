/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useDrag } from '@use-gesture/react'

import React, { forwardRef, useRef } from 'react'

import { State, Translate } from '~/packages/chart'
import { Any } from '~/utils/core'

interface DraggableProps {
  state: State
  children: (props: Any) => React.ReactNode
}

function DraggableComponent(props: DraggableProps): JSX.Element {
  const { state, children } = props
  const xyRef = useRef<Translate | null>(null)

  const dragBind = useDrag((event): void => {
    if (xyRef.current === null) {
      xyRef.current = props.state.translate
    }

    const x = (xyRef.current?.x || 0) + event.movement[0]
    const y = (xyRef.current?.y || 0) + event.movement[1]

    state.setTranslate({ x, y })

    if (event.last) {
      xyRef.current = null
    }
  })

  return <>{children({ ...dragBind() })}</>
}

export const Draggable = forwardRef<SVGSVGElement, DraggableProps>(DraggableComponent)
Draggable.displayName = 'Draggable'