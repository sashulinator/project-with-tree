import clsx from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { setRefs } from '~/utils/react'

export interface CanvasBoardProps extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode
}

function CanvasBoardComponent(props: CanvasBoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <svg width='100%' height='100%' {...props} className={clsx('CanvasBoard', props.className)} ref={setRefs(ref)} />
  )
}

const CanvasBoard = forwardRef<SVGSVGElement, CanvasBoardProps>(CanvasBoardComponent)
CanvasBoard.displayName = 'CanvasBoard'
export default CanvasBoard
