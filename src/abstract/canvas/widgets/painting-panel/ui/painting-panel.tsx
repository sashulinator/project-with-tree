import clsx from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import { getTransform } from '../../../lib/get-transform'
import { Position } from '../../../types/position'

export interface PaintingPanelProps extends React.SVGAttributes<SVGGElement> {
  translate: Position
  scale: number
  children?: React.ReactNode
}

function PaintingPanelComponent(props: PaintingPanelProps, ref: ForwardedRef<SVGGElement>): JSX.Element {
  const { translate, scale, ...gProps } = props
  return (
    <g
      {...gProps}
      ref={ref}
      className={clsx(props?.className, 'a-PaintingPanel')}
      style={{ transform: getTransform(translate, scale), ...props.style }}
    />
  )
}

const PaintingPanel = forwardRef<SVGGElement, PaintingPanelProps>(PaintingPanelComponent)
PaintingPanel.displayName = 'AbstractCanvasPaintingPanel'
export { PaintingPanel }
