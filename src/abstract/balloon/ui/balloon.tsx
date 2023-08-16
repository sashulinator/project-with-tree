import React, { forwardRef } from 'react'

import FitContent from '~/abstract/fit-content'
import Popover, { Point, Points, flipPointHorizontally, flipPointVertically } from '~/abstract/popover'
import { c } from '~/utils/core'
import { ReactElementWithRef, setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'

BalloonComponent.displayName = 'a-Balloon'

/**
 *  Props for the `Balloon` component, which displays a message or other content with a tooltip-like style.
 */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Props to be passed to the arrow element of the Balloon component.
   */
  arrow: ReactElementWithRef<HTMLElement>

  /**
   * The position of the balloon relative to its target element. The arrow of the balloon is calculated based on this prop.
   */
  placement?: Point | undefined

  /**
   * The child element to be displayed within the balloon component.
   */
  children: React.ReactNode
}

/**
 * See README.md
 */
function BalloonComponent(props: Props): JSX.Element {
  const { arrow, placement = 'tc', ...divProps } = props
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null)

  return (
    <Popover
      content={arrow}
      opened={true}
      containerElement={contentEl}
      points={toPoints(placement)}
      contentOffset={calcArrowOffset(placement)}
      deps={[props.placement]}
    >
      <FitContent className={`__${BalloonComponent.displayName}__`} ref={setContentEl}>
        <div {...divProps} className={c(BalloonComponent.displayName, props?.className)} ref={setRefs(setContentEl)} />
      </FitContent>
    </Popover>
  )

  // Private

  function toPoints(placement: Point): Points {
    if (placement.charAt(0) === 'c') {
      return [placement, flipPointHorizontally(placement)]
    }
    return [placement, flipPointVertically(placement)]
  }
}

const Balloon = forwardRef(BalloonComponent)
Balloon.displayName = BalloonComponent.displayName
export default Balloon
