import React from 'react'

import { Decision, Item } from '~/entities/decision'
import { State as ChartState } from '~/packages/chart'
import { State as ItemState } from '~/packages/tree-chart-item'

interface DecisionEditorProps {
  chartState: ChartState<Decision, ItemState<Item>>
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  return <div className='DecisionEditor'>{props.chartState.data.id}</div>
}
