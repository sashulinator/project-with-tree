import './decision.css'

import { useEffect, useMemo, useRef } from 'react'

import { CanvasState, EventNames, Events } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { ActionHistory } from '~/utils/action-history'
import { Any } from '~/utils/core'
import { useEventListener } from '~/utils/hooks'

import Preview from './ui/decision-editor'
import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const state = new CanvasState({ translate: { x: 0, y: 0 }, scale: 1, decision })

  const isHistoryRef = useRef(false)

  useEffect(() => state.emitter.on('*', addToHistory))

  const history = useMemo(() => new ActionHistory(), [])

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        isHistoryRef.current = true
        history.next()
      } else {
        isHistoryRef.current = true
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

  function addToHistory<E extends EventNames>(eventName: E, event: Events[E]): void {
    if (isHistoryRef.current) {
      isHistoryRef.current = false
      return
    }

    if (eventName === 'setSelected') {
      const prev = state._selected.previousValue
      const redo = (): void => {
        state.emitter.emit(eventName, event)
      }
      const undo = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        state.emitter.emit(eventName, { value: prev } as Any)
      }
      history.add(redo, undo)
    }
  }
}
