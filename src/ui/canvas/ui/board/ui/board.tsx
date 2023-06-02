import { Any } from '~/utils/core'
import { setRefs } from '~/utils/react/set-refs'
import { Board as AbstractBoard, BoardDraggable, BoardState, BoardZoomable, ItemState } from '~/widgets/canvas'

export interface BoardProps {
  boardState: BoardState<Any, ItemState<Any>>
  children: React.ReactNode
}

export function Board(props: BoardProps): JSX.Element {
  return (
    <BoardZoomable setScale={props.boardState.scale.set} scale={props.boardState.scale.value}>
      {(zoomProps): JSX.Element => (
        <BoardDraggable lastTranslate={props.boardState.translate.last} onTranslate={props.boardState.translate.move}>
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
