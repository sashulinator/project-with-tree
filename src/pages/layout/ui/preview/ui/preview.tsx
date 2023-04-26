import { useLayoutEffect, useRef } from 'react'

import { SetterOrUpdater } from '~/utils/core'

import { ScaleState, TranslateState } from '../../../types/state'
import { zoom } from '../lib/zoom'

interface PreviewProps {
  translate: TranslateState
  scale: number
  zoomExtent?: { min: number; max: number } | undefined
  setTranslate: SetterOrUpdater<TranslateState>
  setScale: SetterOrUpdater<ScaleState>
}

export default function Preview(props: PreviewProps): JSX.Element {
  const svgRef = useRef<null | SVGSVGElement>(null)
  const gRef = useRef<null | SVGGElement>(null)

  useLayoutEffect(() => zoom(svgRef, props.translate, props.scale, props.setTranslate, props.setScale), [])

  return (
    <div className='rd3t-tree-container'>
      <svg ref={svgRef} width='100%' height='100%'>
        <g
          style={{ transform: `translate(${props.translate.x}px, ${props.translate.y}px) scale(${props.scale})` }}
          ref={gRef}
        >
          <circle cx='50' cy='50' r='50' />
        </g>
      </svg>
    </div>
  )
}
