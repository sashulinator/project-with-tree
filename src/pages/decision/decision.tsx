import './decision.css'

import { DecisionState as ChartState } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'

import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const chartState = new ChartState(decision, { translate: { x: 0, y: 0 }, scale: 1, pointList: decision.data })

  return (
    <main className='DecisionPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview chartState={chartState} />
      <PropsPanel chartState={chartState} />
    </main>
  )
}
