import uuid from 'uuid-random'

import { CanvasState as ChartState, Decision } from '~/entities/decision'
import { PointState } from '~/widgets/chart-item'

interface PropsPanelPropsProps {
  chartState: ChartState<Decision, PointState>
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
    props.chartState.addItemState(id, new PointState(decision, { position: decision, id }))
  }
}
