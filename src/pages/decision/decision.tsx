import './decision.css'

import { useEffect, useMemo } from 'react'

import { DecisionState } from '~/entities/decision'
import { decision } from '~/entities/decision/mock'
import { ActionHistory } from '~/utils/action-history'
import { useEventListener } from '~/utils/hooks'
import { ThemeDropdown } from '~/widgets/theme'

import { Editor } from '../../entities/decision/ui/editor'
import { listenHistory } from './lib/listen-history'

// import PropsPanel from './ui/props-panel'

export default function DecisionPage(): JSX.Element {
  // const { id } = useParams()

  const decisionState = useMemo(() => new DecisionState({ translate: { x: 0, y: 0 }, scale: 1, decision }), [])
  const history = useMemo(() => new ActionHistory(), [])

  useEffect(() => {
    decisionState.onAll((eventName, events) => listenHistory(history, decisionState, eventName, events))
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
      <ThemeDropdown />
      <Editor decision={decisionState} history={history} />
    </main>
  )

  // Private
}
