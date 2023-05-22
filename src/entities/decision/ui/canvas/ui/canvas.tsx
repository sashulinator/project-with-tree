import { useUpdate } from '~/utils/hooks/update'
import AbstractCanvas, { Draggable, Zoomable } from '~/widgets/canvas'

import { CanvasState } from '../state'

export interface CanvasProps {
  canvasState: CanvasState
  children: React.ReactNode
}

export default function Canvas(props: CanvasProps): JSX.Element {
  useUpdate(updateOnEvents)

  return (
    <Zoomable setScale={props.canvasState.setScale} scale={props.canvasState.scale}>
      {(zoomProps): JSX.Element => (
        <Draggable translate={props.canvasState.translate} setTranslate={props.canvasState.setTranslate}>
          {(dragProps): JSX.Element => {
            return (
              <AbstractCanvas
                scale={props.canvasState.scale}
                translate={props.canvasState.translate}
                {...dragProps}
                {...zoomProps}
              >
                {props.children}
              </AbstractCanvas>
            )
          }}
        </Draggable>
      )}
    </Zoomable>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.canvasState.emitter.on('setScale', update)
    props.canvasState.emitter.on('setTranslate', update)
  }
}