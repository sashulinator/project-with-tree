import './layout.css'

import { create } from '~/widgets/chart'

import Preview from './ui/chart'
import PropsPanel from './ui/props-panel'

export default function LayoutPage(): JSX.Element {
  // const { id } = useParams()
  const state = create()

  return (
    <main className='LayoutPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview state={state} />
      <PropsPanel test={undefined} />
    </main>
  )
}
