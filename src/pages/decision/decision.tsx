import './decision.css'

import { create } from '~/packages/chart'

import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()
  const state = create()

  return (
    <main className='DecisionPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview state={state} />
      <PropsPanel state={state} />
    </main>
  )
}
