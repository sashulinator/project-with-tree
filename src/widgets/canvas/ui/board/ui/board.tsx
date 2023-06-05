import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { setRefs } from '~/utils/react'

export interface BoardProps extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode
}

function BoardComponent(props: BoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <svg width='100%' height='100%' {...props} className={clsx(props.className, 'a-CanvasBoard')} ref={setRefs(ref)} />
  )
}

const Board = forwardRef<SVGSVGElement, BoardProps>(BoardComponent)
Board.displayName = 'AbstractCanvasBoard'
export { Board }
