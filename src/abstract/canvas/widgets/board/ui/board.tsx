import { ForwardedRef, forwardRef } from 'react'
import { c } from '~/utils/core'

import { setRefs } from '~/utils/react'

BoardComponent.displayName = 'a-CanvasBoard'

export interface BoardProps extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode
}

function BoardComponent(props: BoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width='100%'
      height='100%'
      {...props}
      className={c(props.className, BoardComponent.displayName)}
      ref={setRefs(ref)}
    />
  )
}

const Board = forwardRef<SVGSVGElement, BoardProps>(BoardComponent)
Board.displayName = BoardComponent.displayName
export { Board }
