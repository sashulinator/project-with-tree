/* eslint-disable eslint-comments/disable-enable-pair, @typescript-eslint/unbound-method */
import { useDrag } from '@use-gesture/react'

import React, { useRef } from 'react'

import { Any } from '~/utils/core'
import { State as ChartState, Translate } from '~/widgets/chart'

interface DraggableProps {
  chartState: ChartState<unknown, Any>
  children: (props: Any) => React.ReactNode
}

export function Draggable(props: DraggableProps): JSX.Element {
  const { chartState: state, children } = props
  const xyRef = useRef<Translate | null>(null)

  const dragBind = useDrag((event): void => {
    if (xyRef.current === null) {
      xyRef.current = props.chartState.translate.value
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
