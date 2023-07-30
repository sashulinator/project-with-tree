import { Board as AbstractBoard, BoardProps as AbstractBoardProps } from '~/abstract/canvas'

import { ForwardedRef, forwardRef } from 'react'
import { c } from '~/utils/core'

BoardComponent.displayName = 'a-CanvasBoard'

export type BoardProps = AbstractBoardProps

function BoardComponent(props: BoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <AbstractBoard
      {...props}
      ref={ref}
      className={c(props.className, BoardComponent.displayName)}
      style={{ touchAction: 'none' }}
    >
      {props.children}
    </AbstractBoard>
  )
}

const Board = forwardRef<SVGSVGElement, BoardProps>(BoardComponent)
Board.displayName = BoardComponent.displayName
export { Board }
