import uuid from 'uuid-random'

import { Decision, Item } from '~/entities/decision'
import { State as ChartState } from '~/packages/chart'
import { State as ItemState } from '~/packages/chart-item'

interface PropsPanelPropsProps {
  chartState: ChartState<Decision, ItemState<Item>>
}

export default function PropsPanelProps(props: PropsPanelPropsProps): JSX.Element {
  return (
    <div className='PropsPanelProps'>
      {props.chartState.data.id}
      <button onClick={onAddVoidClick}>Add VOID node</button>
    </div>
  )

  // Private

  function onAddVoidClick(): void {
    const id = uuid()
    const decision = {
      type: 'VOID',
      id,
      name: `void_${id}`,
      x: 10,
      y: 400,
    }
    props.chartState.addItemState(id, new ItemState(decision, { position: decision, id }))
  }
}
