import clsx from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

import { getTransform } from '../../../lib/get-transform'
import { Translate } from '../../../types/translate'

interface PaintingPanelProps extends React.SVGAttributes<SVGGElement> {
  translate: Translate
  scale: number
  children?: React.ReactNode
}

function PaintingPanelComponent(props: PaintingPanelProps, ref: ForwardedRef<SVGGElement>): JSX.Element {
  const { translate, scale, ...gProps } = props
  return (
    <g
      {...gProps}
      ref={ref}
      className={clsx('PaintingPanel', props?.className)}
      style={{ transform: getTransform(translate, scale), ...props.style }}
    />
  )
}

const PaintingPanel = forwardRef<SVGGElement, PaintingPanelProps>(PaintingPanelComponent)
PaintingPanel.displayName = 'PaintingPanel'
export default PaintingPanel
