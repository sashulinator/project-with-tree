import './layout.css'

import { useState } from 'react'

import { ScaleState, TranslateState } from './types/state'
import Preview from './ui/preview'
import PropsPanel from './ui/props-panel'
import TreePanel from './ui/tree-panel'

export default function LayoutPage(): JSX.Element {
  // const { id } = useParams()
  const [translate, setTranslate] = useState<TranslateState>(buildInitTranslateState)
  const [scale, setScale] = useState<ScaleState>(1)

  return (
    <main className='LayoutPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview translate={translate} setTranslate={setTranslate} scale={scale} setScale={setScale} />
      <PropsPanel test={undefined} />
    </main>
  )

  // Private

  function buildInitTranslateState(): TranslateState {
    return {
      x: 0,
      y: 0,
    }
  }
}
