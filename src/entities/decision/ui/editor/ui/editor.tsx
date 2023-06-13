// import { PaintingPanel } from '~/abstract/canvas'
import { useEffect, useMemo } from 'react'

import { Decision, EditorState } from '~/entities/decision'
// import { SiftNode } from '~/entities/point/ui/node.sift'
import { Board } from '~/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { useEventListener, useUpdate } from '~/utils/hooks'

import { listenHistory } from '../lib/listen-history'

interface EditorProps {
  decision: Decision
}

export function Editor(props: EditorProps): JSX.Element {
  const editorState = useMemo(() => new EditorState({ translate: { x: 0, y: 0 }, scale: 1 }), [])
  const history = useMemo(() => new ActionHistory(), [])

  useUpdate(updateOnEvents)

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        history.next()
      } else {
        history.previous()
      }
    }
  })

  useEffect(() => {
    editorState.onAll((eventName, events) => listenHistory(history, editorState, eventName, events))
  }, [])

  return (
    <Board state={editorState}>
      {/* <PaintingPanel translate={props.chartState.translate.value} scale={props.chartState.scale.value}></PaintingPanel>
      <PaintingPanel translate={props.chartState.translate.value} scale={props.chartState.scale.value}>
        {itemStates.flatMap((state) => {
          return state.ruleList.value.map((rule) => {
            const targetState = props.chartState.itemStates.get(rule.pointId)
            return (
              <Link
                sourceOffset={getSourceOffset(state.id)}
                targetOffset={{ top: 0, left: 0 }}
                key={state.point.id}
                sourceState={state}
                targetState={targetState}
                decisionState={props.chartState}
              />
            )
          })
        })}
      </PaintingPanel> */}
      {/* <PaintingPanel translate={props.decision.translate.value} scale={props.decision.scale.value}>
        {itemStates.map((state) => {
          return <SiftNode key={state.point.id} state={state} decisionState={props.decision} />
        })}
      </PaintingPanel> */}
    </Board>
  )

  // Private

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
