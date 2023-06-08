import { Board as AbstractBoard, BoardDraggable, BoardState, BoardZoomable, ItemState } from '~/abstract/canvas'
import { Any } from '~/utils/core'
import { setRefs } from '~/utils/react/set-refs'

export interface BoardProps {
  state: BoardState<Any, Any>
  children: React.ReactNode
}

export function Board(props: BoardProps): JSX.Element {
  return (
    <BoardZoomable setScale={(...qrgs): void => props.state.scale.set(...qrgs)} scale={props.state.scale.value}>
      {(zoomProps): JSX.Element => (
        <BoardDraggable
          lastTranslate={props.state.translate.last}
          onTranslate={(...args): void => props.state.translate.move(...args)}
        >
          {(dragProps): JSX.Element => {
            return (
              <AbstractBoard {...dragProps} ref={setRefs(zoomProps.ref)} style={{ touchAction: 'none' }}>
                {props.children}
              </AbstractBoard>
            )
          }}
        </BoardDraggable>
      )}
    </BoardZoomable>
  )
}
