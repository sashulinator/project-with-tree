import clsx from 'clsx'
import { ForwardedRef, forwardRef, useRef } from 'react'

import { setRefs } from '~/utils/react'

import { Translate } from '../types/translate'

export interface CanvasBoardProps extends React.SVGAttributes<SVGSVGElement> {
  translate: Translate
  scale: number
  children: React.ReactNode
  paintingPanelProps?: React.HTMLAttributes<SVGGElement> & { ref?: ForwardedRef<SVGGElement> }
}

function CanvasBoardComponent(props: CanvasBoardProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { children, translate, scale, paintingPanelProps, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  return (
    <svg
      width='100%'
      height='100%'
      {...svgProps}
      className={clsx('CanvasBoard', props.className)}
      ref={setRefs(svgRef, ref)}
    >
      <g
        {...paintingPanelProps}
        className={clsx('painting-panel', paintingPanelProps?.className)}
        style={{ transform: getTransform() }}
      >
        {children}
      </g>
    </svg>
  )

  // Private

  function getTransform(): string {
    return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
  }
}

const CanvasBoard = forwardRef<SVGSVGElement, CanvasBoardProps>(CanvasBoardComponent)
CanvasBoard.displayName = 'CanvasBoard'
export default CanvasBoard
