import { createElement, useState } from 'react'

import Popover from '~/ui/popover'

import { adjustPlacement } from '../lib/adjust-placement'
import { CalloutProps } from '../types/callout-props'

/**
 * Компонент
 * @param props
 * @returns
 */
export default function Callout<IContentProp>(props: CalloutProps<IContentProp>): JSX.Element {
  const { placement = 'bc', ...popoverProps } = props
  const [isXAdjusted, setXAdjusted] = useState(false)
  const [isYAdjusted, setYAdjusted] = useState(false)
  const adjustedPlacement = adjustPlacement(placement, { x: isXAdjusted, y: isYAdjusted })

  const content = createElement(props.renderContent, { ...props.contentProps, placement: adjustedPlacement })

  return (
    <Popover
      {...popoverProps}
      placement={placement}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      content={content as any}
      onAligned={(ret): void => {
        setXAdjusted(ret.isXAdjusted)
        setYAdjusted(ret.isYAdjusted)
      }}
    >
      {props.children}
    </Popover>
  )
}
