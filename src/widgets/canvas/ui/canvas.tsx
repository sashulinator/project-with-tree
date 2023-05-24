import { ForwardedRef, forwardRef, useRef } from 'react'

import { setRefs } from '~/utils/react'

import { Translate } from '../types/translate'

export interface CanvasProps extends React.SVGAttributes<SVGSVGElement> {
  translate: Translate
  scale: number
  children: React.ReactNode
}

function CanvasComponent(props: CanvasProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  const { children, translate, scale, ...svgProps } = props
  const svgRef = useRef<null | SVGSVGElement>(null)

  return (
    <svg
      width='100%'
      height='100%'
      {...svgProps}
      style={{ touchAction: 'none', ...svgProps.style }}
      ref={setRefs(svgRef, ref)}
    >
      <g style={{ transform: getTransform() }}>{children}</g>
    </svg>
  )

  // Private

  function getTransform(): string {
    return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
  }
}

const Canvas = forwardRef<SVGSVGElement, CanvasProps>(CanvasComponent)
Canvas.displayName = 'Canvas'
export default Canvas
