import { useState } from 'react'

import { CanvasState as ChartState, Node } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import Link from '~/entities/point/ui/link'
import { ActionHistory } from '~/utils/action-history'
import { Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'
import { useUpdate } from '~/utils/hooks'

interface DecisionEditorProps {
  chartState: ChartState
  history: ActionHistory
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.itemStates.value)
  const [linksContainer, setLinksContainer] = useState<SVGGElement | null>()

  useUpdate(updateOnEvents)

  return (
    <Canvas
      canvasState={props.chartState}
      abovePaintingPanelChildren={
        props.chartState.editingLink.value && (
          <Link
            sourceState={props.chartState.editingLink.value.sourceState}
            targetState={props.chartState.editingLink.value.targetState}
            targetOffset={null}
            sourceOffset={getSourceOffset()}
            decisionState={props.chartState}
          />
        )
      }
    >
      <g ref={setLinksContainer} style={{ outline: 'none' }}></g>
      {linksContainer && (
        <>
          {itemStates.map((state) => {
            return (
              <Node key={state.point.id} state={state} decisionState={props.chartState}>
                Test
              </Node>
            )
          })}
        </>
      )}
    </Canvas>
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
