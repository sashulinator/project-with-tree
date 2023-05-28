import React, { useEffect, useState } from 'react'

import { Id } from '~/utils/core'

import { CanvasState } from '../../../../../entities/decision/ui/canvas/state'

export interface SelectableProps {
  children: (props: {
    isSelected: boolean
    selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void
  }) => React.ReactNode
  id: Id
  chartState: CanvasState
}

export default function Selectable(props: SelectableProps): JSX.Element {
  const [isSelected, select] = useState(false)

  useEffect(() => {
    props.chartState.emitter.on('setSelected', ({ value }) => select(value?.includes(props.id)))
  })

  return <>{props.children({ isSelected, selectOnMouseAction })}</>

  // Private

  function selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void {
    if (e.metaKey) {
      props.chartState.selected.toggle(props.id)
    } else {
      // Исключаем попадание в историю избыточное выделение
      if (props.chartState.selected.isSelected(props.id)) return
      props.chartState.selected.add(props.id)
    }
  }
}