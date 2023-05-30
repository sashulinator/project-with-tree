import clsx from 'clsx'
import { ForwardedRef, forwardRef, useRef } from 'react'

import { setRefs } from '~/utils/react'

export interface CanvasBoardProps extends React.SVGAttributes<SVGSVGElement> {
  children: React.ReactNode
}

function CanvasBoardComponent(props: CanvasBoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { children, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  return (
    <svg
      width='100%'
      height='100%'
      {...svgProps}
      className={clsx('CanvasBoard', props.className)}
      ref={setRefs(svgRef, ref)}
    >
      {children}
    </svg>
  )
}

const CanvasBoard = forwardRef<SVGSVGElement, CanvasBoardProps>(CanvasBoardComponent)
CanvasBoard.displayName = 'CanvasBoard'
export default CanvasBoard
