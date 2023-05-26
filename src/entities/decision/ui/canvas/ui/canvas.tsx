import clsx from 'clsx'

import { useUpdate } from '~/utils/hooks/update'
import { setRefs } from '~/utils/react/set-refs'
import AbstractCanvasBoard, { Draggable, PaintingPanel, Zoomable } from '~/widgets/canvas'

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
        <Draggable state={props.canvasState}>
          {(dragProps): JSX.Element => {
            return (
              <AbstractCanvasBoard
                {...dragProps}
                ref={setRefs(props.canvasState.setCanvasBoardRef, zoomProps.ref)}
                style={{ touchAction: 'none' }}
              >
                <PaintingPanel
                  scale={props.canvasState.scale}
                  translate={props.canvasState.translate}
                  className={clsx('mainPaintingPanel')}
                  ref={props.canvasState.setPaintingPanelRef}
                >
                  {props.children}
                </PaintingPanel>
              </AbstractCanvasBoard>
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
