import './editor.css'

import { useEffect, useMemo } from 'react'

import { PaintingPanel } from '~/abstract/canvas'
import { Decision, EditorState } from '~/entities/decision'
import { NodeState } from '~/entities/point'
import { LinkState, Rule } from '~/entities/rule'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { useBoolean, useEventListener, useOnMount, useUpdate } from '~/utils/hooks'

import { Links } from '../../links'
import { LinkStateDictionary } from '../../links/state/state'
import { Nodes } from '../../nodes'
import { NodeStateDictionary } from '../../nodes/state/state'
import { listenHistory } from '../lib/listen-history'

interface EditorProps {
  decision: Decision
}

export function Editor(props: EditorProps): JSX.Element {
  const [isRenderLinks, setIsRenderLinks] = useBoolean(false)
  useOnMount(setIsRenderLinks)
  const rules = props.decision.rules || []

  const history = useMemo(() => new ActionHistory(), [])

  const editorState = useMemo(() => new EditorState({ translate: { x: 0, y: 0 }, scale: 1 }), [])

  const linkStateList = useMemo(() => rules?.map((rule) => new LinkState({ id: rule.id, rule })), [])

  const nodeStateList = useMemo(() => props.decision.data.map((point) => new NodeState({ point })), [])

  const linkStates = useMemo(() => new LinkStateDictionary(linkStateList), [linkStateList])

  const nodeStates = useMemo(() => new NodeStateDictionary(nodeStateList), [])

  useUpdate(updateOnEvents, [linkStates])

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <Board state={editorState} className='decision-EditorBoard'>
      <PaintingPanel translate={editorState.translate.value} scale={editorState.scale.value}>
        {isRenderLinks && (
          <Links
            canvasTranslate={editorState.translate.value}
            scale={editorState.scale.value}
            linkStates={linkStates}
            nodeStates={nodeStates}
          />
        )}
        <Nodes scale={editorState.scale.value} linkStates={linkStates} nodeStates={nodeStates} />
      </PaintingPanel>
    </Board>
  )

  // Private

  function onKeyDown(ev: KeyboardEvent): void {
    if (!ev.metaKey || ev.key !== 'z') return

    if (ev.shiftKey) {
      history.next()
    } else {
      history.previous()
    }
  }

  function updateOnEvents(update: () => void): void {
    editorState.on('translate', update)
    editorState.on('scale', update)
    nodeStates.onAll(() => {
      const svg = document.querySelector<SVGSVGElement>('svg')

      document.body.style.width = `100.0${Math.random()}%`
    })
  }
}

Editor.displayName = 'DecisionEditor'
