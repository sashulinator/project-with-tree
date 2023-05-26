import { useState } from 'react'

import { CanvasState as ChartState, Node } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { useUpdate } from '~/utils/hooks'
import ChartLink from '~/widgets/chart-link'

interface DecisionEditorProps {
  chartState: ChartState
  history: ActionHistory
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.pointStates.value)
  const [linksContainer, setLinksContainer] = useState<SVGGElement | null>()

  useUpdate(updateOnEvents)

  return (
    <Canvas
      canvasState={props.chartState}
      abovePaintingPanelChildren={
        props.chartState.editingLink.value && (
          <ChartLink decisionState={props.chartState} {...props.chartState.editingLink.value} />
        )
      }
    >
      <g ref={setLinksContainer} style={{ outline: 'none' }}></g>
      {linksContainer && (
        <>
          {itemStates.map((state) => {
            return (
              <Node
                linksContainer={linksContainer}
                key={state.point.id}
                state={state}
                decisionState={props.chartState}
              />
            )
          })}
        </>
      )}
    </Canvas>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.chartState.emitter.on('setItemStates', update)
    props.chartState.emitter.on('setItemStates', update)
    props.chartState.emitter.on('setEditingLink', update)
  }
}
