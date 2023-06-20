import { Board as AbstractBoard, BoardDraggable, BoardState, BoardZoomable } from '~/abstract/canvas'
import { Any } from '~/utils/core'

export interface BoardProps {
  state: BoardState<Any>
  children: React.ReactNode
}

export function Board(props: BoardProps): JSX.Element {
  return (
    <BoardZoomable
      translate={props.state.translate.value}
      setTranslate={(...args): void => props.state.translate.move(...args)}
      setScale={(...qrgs): void => props.state.scale.set(...qrgs)}
      scale={props.state.scale.value}
    >
      {(zoomProps): JSX.Element => (
        <BoardDraggable
          lastTranslate={props.state.translate.last}
          onTranslate={(...args): void => props.state.translate.move(...args)}
        >
          {(dragProps): JSX.Element => {
            return (
              <AbstractBoard {...dragProps} {...zoomProps} style={{ touchAction: 'none' }}>
                {props.children}
              </AbstractBoard>
            )
          }}
        </BoardDraggable>
      )}
    </BoardZoomable>
  )
}
