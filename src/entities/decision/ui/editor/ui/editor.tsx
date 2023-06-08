import { PaintingPanel } from '~/abstract/canvas'
import { CanvasState } from '~/entities/decision'
import { Link } from '~/entities/point'
import { SiftNode } from '~/entities/point/ui/node.sift'
import { Board } from '~/ui/canvas/ui/board'
import { ActionHistory } from '~/utils/action-history'
import { Id, Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'

interface EditorProps {
  chartState: CanvasState
  history: ActionHistory
}

export function Editor(props: EditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates.value)

  useUpdate(updateOnEvents)

  return (
    <Board state={props.chartState}>
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
      <PaintingPanel translate={props.chartState.translate.value} scale={props.chartState.scale.value}>
        {itemStates.map((state) => {
          return <SiftNode key={state.point.id} state={state} decisionState={props.chartState} />
        })}
      </PaintingPanel>
    </Board>
  )

  // Private

  function getSourceOffset(id: Id | undefined): Offset | null {
    const sourceState = props.chartState.editingLink.value?.sourceState
    if (!id) return null
    const srcLinkEl = sourceState?.ref.value?.querySelector(`[data-id="${id.toString()}"]`)
    if (!srcLinkEl || !sourceState) return null
    const srcLinkOffset = getOffsetInElement(srcLinkEl, sourceState?.ref.value)
    const srcLinkRect = srcLinkEl?.getBoundingClientRect() || { height: 0 }

    return {
      left: sourceState.width.value,
      top: (srcLinkOffset.top + srcLinkRect.height / 2) / props.chartState.scale.value,
    }
  }

  function updateOnEvents(update: () => void): void {
    props.chartState.emitter.on('setItemStates', update)
    props.chartState.emitter.on('setItemStates', update)
    props.chartState.emitter.on('setEditingLink', update)
    props.chartState.emitter.on('setTranslate', update)
    props.chartState.emitter.on('setScale', update)
  }
}

Editor.displayName = 'DecisionEditor'
