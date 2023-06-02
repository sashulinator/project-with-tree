import clsx from 'clsx'

import { useUpdate } from '~/utils/hooks/update'
import { setRefs } from '~/utils/react/set-refs'
import { Board as AbstractBoard, BoardDraggable, BoardZoomable, PaintingPanel } from '~/widgets/canvas'

import { CanvasState } from '../state'

export interface CanvasProps {
  canvasState: CanvasState
  children: React.ReactNode
  abovePaintingPanelChildren: React.ReactNode
}

export default function Canvas(props: CanvasProps): JSX.Element {
  useUpdate(updateOnEvents)

  return (
    <BoardZoomable setScale={props.canvasState.scale.set} scale={props.canvasState.scale.value}>
      {(zoomProps): JSX.Element => (
        <BoardDraggable state={props.canvasState}>
          {(dragProps): JSX.Element => {
            return (
              <AbstractBoard
                {...dragProps}
                ref={setRefs(props.canvasState.canvasBoardRef.set, zoomProps.ref)}
                style={{ touchAction: 'none' }}
              >
                <PaintingPanel
                  scale={props.canvasState.scale.value}
                  translate={props.canvasState.translate.value}
                  className={clsx('abovePaintingPanel')}
                >
                  {props.abovePaintingPanelChildren}
                </PaintingPanel>
                <PaintingPanel
                  scale={props.canvasState.scale.value}
                  translate={props.canvasState.translate.value}
                  className={clsx('mainPaintingPanel')}
                  ref={setRefs(props.canvasState.paintingPanelRef.set)}
                >
                  {props.children}
                </PaintingPanel>
              </AbstractBoard>
            )
          }}
        </BoardDraggable>
      )}
    </BoardZoomable>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.canvasState.emitter.on('setScale', update)
    props.canvasState.emitter.on('setTranslate', update)
  }
}
