import React, { useEffect, useState } from 'react'

import { Id } from '~/utils/core'

// TODO нельзя импортировать из entities в abstract
import { EditorState } from '../../../../../entities/decision/ui/editor/state/state'

export interface CanvasItemSelectableProps {
  children: (props: {
    isSelected: boolean
    selectOnMouseAction(e: React.MouseEvent<SVGGElement>): void
  }) => React.ReactNode
  id: Id
  chartState: EditorState
}

/**
 * @deprecated
 */
export default function ItemSelectable(props: CanvasItemSelectableProps): JSX.Element {
  const [isSelected, select] = useState(false)

  useEffect(() => {
    props.chartState.on('selected', ({ value }) => select(value?.includes(props.id)))
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

ItemSelectable.displayName = 'CanvasItemSelectable'
