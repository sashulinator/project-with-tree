import { Decision, Item } from '~/entities/decision'
import { State as ChartState } from '~/packages/chart'
import { State as ItemState } from '~/packages/tree-chart-item'

interface PropsPanelPropsProps {
  chartState: ChartState<Decision, ItemState<Item>>
}

export default function PropsPanelProps(props: PropsPanelPropsProps): JSX.Element {
  return (
    <div className='PropsPanelProps'>
      {props.chartState.data.id}
      <button>Save</button>
    </div>
  )

  // Private

  // function onClick(): void {
  //   Object.values(props.state.states).map((state) => {
  //     console.log(state.normalize())
  //   })
  // }
}
