import { CanvasState, Node } from '~/entities/decision'
import Link from '~/entities/point/ui/link'
import { Board } from '~/ui/canvas/ui/board'
import { ActionHistory } from '~/utils/action-history'
import { Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'
import { PaintingPanel } from '~/widgets/canvas'

interface DecisionEditorProps {
  chartState: CanvasState
  history: ActionHistory
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates.value)

  useUpdate(updateOnEvents)

  return (
    <Board state={props.chartState}>
      <PaintingPanel translate={props.chartState.translate.value} scale={props.chartState.scale.value}>
        {props.chartState.editingLink.value && (
          <Link
            sourceState={props.chartState.editingLink.value.sourceState}
            targetState={props.chartState.editingLink.value.targetState}
            targetOffset={null}
            sourceOffset={getSourceOffset()}
            decisionState={props.chartState}
          />
        )}
      </PaintingPanel>
      <PaintingPanel translate={props.chartState.translate.value} scale={props.chartState.scale.value}>
        {itemStates.map((state) => {
          return (
            <Node key={state.point.id} state={state} decisionState={props.chartState}>
              Test
            </Node>
          )
        })}
      </PaintingPanel>
    </Board>
  )

  // Private

  function getSourceOffset(): Offset | null {
    const sourceState = props.chartState.editingLink.value?.sourceState
    const id = props.chartState.editingLink.value?.sourceRuleId
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
  }
}
