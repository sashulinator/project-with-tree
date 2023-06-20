import { useEffect, useMemo } from 'react'

import { PaintingPanel } from '~/abstract/canvas'
import { Decision, EditorState } from '~/entities/decision'
import { NodeState } from '~/entities/point'
import { LinkState, Rule } from '~/entities/rule'
import { EmitterableDictionary } from '~/lib/emitter/dictionary'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { useBoolean, useEventListener, useOnMount, useUpdate } from '~/utils/hooks'

import { Links } from '../../links'
import { LinkStateDictionary } from '../../links/state/state'
import { Nodes } from '../../nodes'
import { listenHistory } from '../lib/listen-history'

interface EditorProps {
  decision: Decision
  ruleList: Rule[]
}

export function Editor(props: EditorProps): JSX.Element {
  const [isRenderLinks, setIsRenderLinks] = useBoolean(false)
  useOnMount(setIsRenderLinks)

  const history = useMemo(() => new ActionHistory(), [])

  const editorState = useMemo(() => new EditorState({ translate: { x: 0, y: 0 }, scale: 1 }), [])

  const linkStateList = useMemo(() => props.ruleList.map((rule) => new LinkState({ id: rule.id, rule })), [])

  const nodeStateList = useMemo(() => props.decision.data.map((point) => new NodeState({ point })), [])

  const linkStates = useMemo(() => new LinkStateDictionary(linkStateList), [])

  const nodeStates = useMemo(() => new EmitterableDictionary(nodeStateList, (l) => l.id.toString()), [])

  useUpdate(updateOnEvents)

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <Board state={editorState}>
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
  }
}

Editor.displayName = 'DecisionEditor'
