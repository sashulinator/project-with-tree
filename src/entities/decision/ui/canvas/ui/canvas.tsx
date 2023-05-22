import { useUpdate } from '~/utils/hooks/update'
import AbstractCanvas, { CanvasProps, Draggable, Zoomable } from '~/widgets/canvas'

import { EventNames } from '../state'

export default function Canvas(props: CanvasProps): JSX.Element {
  useUpdate(updateOnEvents)

  return (
    <Zoomable setScale={props.state.setScale} scale={props.state.scale}>
      {(zoomProps): JSX.Element => (
        <Draggable translate={props.state.translate} setTranslate={props.state.setTranslate}>
          {(dragProps): JSX.Element => {
            return <AbstractCanvas {...props} {...dragProps} {...zoomProps} />
          }}
        </Draggable>
      )}
    </Zoomable>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.state.emitter.on(EventNames.setScale, update)
    props.state.emitter.on(EventNames.setTranslate, update)
  }
}
