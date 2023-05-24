import { useState } from 'react'

import { CanvasState as ChartState, Node } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { useUpdate } from '~/utils/hooks'

interface DecisionEditorProps {
  chartState: ChartState
  history: ActionHistory
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.pointStates.value)
  const [linksContainer, setLinksContainer] = useState<SVGGElement | null>()

  useUpdate(updateOnEvents)

  return (
    <Canvas canvasState={props.chartState}>
      <g ref={setLinksContainer}></g>
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
  }
}
