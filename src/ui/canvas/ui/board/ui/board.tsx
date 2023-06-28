import { Board as AbstractBoard, BoardDraggable, BoardState, BoardZoomable } from '~/abstract/canvas'
import { Any } from '~/utils/core'
import { setRefs } from '~/utils/react'

export interface BoardProps extends React.SVGAttributes<SVGSVGElement> {
  state: BoardState<Any>
  children: React.ReactNode
}

export function Board(props: BoardProps): JSX.Element {
  const { state, ...svgProps } = props

  return (
    <BoardZoomable
      translate={state.translate.value}
      setTranslate={(...args): void => state.translate.move(...args)}
      setScale={(...qrgs): void => state.scale.set(...qrgs)}
      scale={state.scale.value}
    >
      {(dragProps): JSX.Element => {
        return (
          <AbstractBoard ref={setRefs(dragProps.ref, state.ref.set)} {...svgProps} style={{ touchAction: 'none' }}>
            {props.children}
          </AbstractBoard>
        )
      }}
    </BoardZoomable>
  )
}
