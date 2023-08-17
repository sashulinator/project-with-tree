import React, { forwardRef } from 'react'

import { calcArrowOffset } from '..'
import { c } from '../../../utils/core'
import { setRefs } from '../../../utils/react'
import { Point, flipPointHorizontally, flipPointVertically } from '../../callout'
import FitContent from '../../fit-content'
import Popover, { OnAligned, Points, PopoverProps } from '../../popover'

BalloonComponent.displayName = 'a-Balloon'

/**
 *  Props for the `Balloon` component, which displays a message or other content with a tooltip-like style.
 */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Props to be passed to the arrow element of the Balloon component.
   */
  renderArrow: (
    props: { ref: React.ForwardedRef<HTMLElement> } & PopoverProps & { adjustedPoints: Points }
  ) => JSX.Element

  /**
   * The position of the balloon relative to its target element. The arrow of the balloon is calculated based on this prop.
   */
  placement?: Point | undefined

  /**
   * The child element to be displayed within the balloon component.
   */
  children: React.ReactNode

  /**
   * Content props.
   */
  contentProps: React.HTMLAttributes<HTMLDivElement>

  /**
   * A function that is called when the popover is closed.
   */
  onClose?: ((e: MouseEvent | TouchEvent | KeyboardEvent) => void) | undefined

  /**
   * A function that is called when a click or touch event occurs outside the popover.
   */
  onClickOutside?: ((e: MouseEvent | TouchEvent) => void) | undefined

  /**
   * A function that is called when an escape key or touch event occurs.
   */
  onEscKeyDown?: ((e: KeyboardEvent) => void) | undefined

  /**
   *  An optional function to be called after the child element is positioned.
   */
  onAligned?: OnAligned | undefined
}

/**
 * See README.md
 */
function BalloonComponent(props: Props): JSX.Element {
  const { renderArrow, placement = 'tc', contentProps, children, ...fitContentProps } = props
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null)

  return (
    <Popover
      placement={flipPointVertically(flipPointHorizontally(placement))}
      opened={true}
      offset={calcArrowOffset(placement)}
      containerElement={contentEl}
      renderContent={renderArrow}
    >
      <FitContent
        {...fitContentProps}
        className={c(BalloonComponent.displayName, props.className)}
        ref={setRefs(setContentEl)}
      >
        <div {...contentProps} className={c('content', contentProps.className)}>
          {children}
        </div>
      </FitContent>
    </Popover>
  )
}

const Balloon = forwardRef(BalloonComponent)
Balloon.displayName = BalloonComponent.displayName
export default Balloon
