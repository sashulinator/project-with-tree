import { Board as AbstractBoard, BoardState } from '~/abstract/canvas'
import { Any } from '~/utils/core'
import { setRefs } from '~/utils/react'

export interface BoardProps extends React.SVGAttributes<SVGSVGElement> {
  state: BoardState<Any>
  children: React.ReactNode
}

export function Board(props: BoardProps): JSX.Element {
  const { state, ...svgProps } = props

  return (
    <AbstractBoard ref={setRefs(state.ref.set)} {...svgProps} style={{ touchAction: 'none' }}>
      {props.children}
    </AbstractBoard>
  )
}
