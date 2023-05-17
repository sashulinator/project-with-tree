/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useDrag } from '@use-gesture/react'

import React, { useRef } from 'react'

import { DecisionState as ChartState, Translate } from '~/entities/decision'
import { Any } from '~/utils/core'

interface DraggableProps {
  chartState: ChartState<unknown, Any>
  children: (props: Any) => React.ReactNode
}

export function Draggable(props: DraggableProps): JSX.Element {
  const { chartState: state, children } = props
  const xyRef = useRef<Translate | null>(null)

  const dragBind = useDrag((event): void => {
    event.event.preventDefault()

    if (xyRef.current === null) {
      xyRef.current = props.chartState.translate
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

Draggable.displayName = 'Draggable'
