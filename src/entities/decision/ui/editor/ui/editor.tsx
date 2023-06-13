import { useEffect, useMemo } from 'react'

import { PaintingPanel } from '~/abstract/canvas'
import { Decision, EditorState } from '~/entities/decision'
import { NodeState } from '~/entities/point'
import { LinkState, Rule } from '~/entities/rule'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { EmitterableDictionary } from '~/utils/emitter/dictionary'
import { useEventListener, useUpdate } from '~/utils/hooks'

import { Links } from '../../links'
import { Nodes } from '../../nodes'
import { listenHistory } from '../lib/listen-history'

interface EditorProps {
  decision: Decision
  ruleList: Rule[]
}

export function Editor(props: EditorProps): JSX.Element {
  const history = useMemo(() => new ActionHistory(), [])

  const editorState = useMemo(() => new EditorState({ translate: { x: 0, y: 0 }, scale: 1 }), [])

  const linkStateList = useMemo(() => props.ruleList.map((rule) => new LinkState({ id: rule.id, rule })), [])

  const nodeStateList = useMemo(() => props.decision.data.map((point) => new NodeState({ point })), [])

  const linkStates = useMemo(() => new EmitterableDictionary(linkStateList, (l) => l.id.toString()), [])

  const nodeStates = useMemo(() => new EmitterableDictionary(nodeStateList, (l) => l.id.toString()), [])

  useUpdate(updateOnEvents)

  useEventListener('keydown', onKeyDown)

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <Board state={editorState}>
      <PaintingPanel translate={editorState.translate.value} scale={editorState.scale.value}>
        <Links
          canvasTranslate={editorState.translate.value}
          scale={editorState.scale.value}
          linkStates={linkStates}
          nodeStates={nodeStates}
        />
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

  // function getSourceOffset(id: Id | undefined): Offset | null {
  //   const sourceState = props.decision.editingLink.value?.sourceState
  //   if (!id) return null
  //   const srcLinkEl = sourceState?.ref.value?.querySelector(`[data-id="${id.toString()}"]`)
  //   if (!srcLinkEl || !sourceState) return null
  //   const srcLinkOffset = getOffsetInElement(srcLinkEl, sourceState?.ref.value)
  //   const srcLinkRect = srcLinkEl?.getBoundingClientRect() || { height: 0 }

  //   return {
  //     left: sourceState.width.value,
  //     top: (srcLinkOffset.top + srcLinkRect.height / 2) / props.decision.scale.value,
  //   }
  // }

  function updateOnEvents(update: () => void): void {
    editorState.on('translate', update)
    editorState.on('scale', update)
  }
}

Editor.displayName = 'DecisionEditor'
