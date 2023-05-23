import './decision.css'

import { useEffect, useMemo } from 'react'

import { CanvasState } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { ActionHistory } from '~/utils/action-history'
import { useEventListener } from '~/utils/hooks'

import { listenHistory } from './lib/listen-history'
import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const state = useMemo(() => new CanvasState({ translate: { x: 0, y: 0 }, scale: 1, decision }), [])
  const history = useMemo(() => new ActionHistory(), [])

  useEffect(() => {
    state.emitter.on('*', (eventName, events) => listenHistory(history, state, eventName, events))
  }, [])

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        history.next()
      } else {
        history.previous()
      }
    }
  })

  return (
    <main className='DecisionPage'>
      {/* <TreePanel test={undefined} /> */}
      <Preview chartState={state} history={history} />
      <PropsPanel chartState={state} />
    </main>
  )

  // Private
}
