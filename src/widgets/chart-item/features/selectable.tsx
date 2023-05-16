import React, { useEffect, useState } from 'react'

import { Any, Id } from '~/utils/core'

import { State as ChartState, EventNames } from '../../chart/state'

export interface SelectableProps {
  children: (props: {
    isSelected: boolean
    selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void
  }) => React.ReactNode
  id: Id
  chartState: ChartState<Any, Any>
}

export default function Selectable(props: SelectableProps): JSX.Element {
  const [isSelected, select] = useState(false)

  useEffect(() => {
    props.chartState.emitter.on(EventNames.setSelected, ({ value }) => select(value?.includes(props.id)))
  })

  return <>{props.children({ isSelected, selectOnMouseAction })}</>

  // Private

  function selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void {
    if (e.metaKey) {
      props.chartState.selectToggle(props.id)
    } else {
      // Исключаем попадание в историю избыточное выделение
      if (props.chartState.selected.includes(props.id)) return
      props.chartState.select([props.id])
    }
  }
}
