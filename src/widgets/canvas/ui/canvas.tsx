import { ForwardedRef, forwardRef, useRef } from 'react'

import { DecisionState as ChartState } from '~/entities/decision'
import { Any } from '~/utils/core'
import { setRefs } from '~/utils/react'

export interface CanvasProps extends React.SVGAttributes<SVGSVGElement> {
  state: ChartState<Any, Any>
  children: React.ReactNode
}

function CanvasComponent(props: CanvasProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { state: state, children, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  return (
    <svg width='100%' height='100%' {...svgProps} ref={setRefs(svgRef, ref)}>
      <g style={{ transform: getTransform() }}>{children}</g>
    </svg>
  )

  // Private

  function getTransform(): string {
    const { translate, scale } = state
    return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
  }
}

const Canvas = forwardRef<SVGSVGElement, CanvasProps>(CanvasComponent)
Canvas.displayName = 'Canvas'
export default Canvas
