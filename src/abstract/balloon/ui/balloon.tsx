import React, { ForwardedRef, Ref, forwardRef, useRef } from 'react'

import { getStyle } from '~/utils/dom'

import { calcArrowOffset } from '..'
import { Dictionary, assertDefined, c } from '../../../utils/core'
import { setRefs } from '../../../utils/react'
import Popover, { OnAligned, Point, Points, flipPointHorizontally, flipPointVertically } from '../../popover'

BalloonComponent.displayName = 'a-Balloon'

/**
 *  Props for the `Balloon` component, which displays a message or other content with a tooltip-like style.
 */
export interface Props<C extends Dictionary> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Props to be passed to the arrow element of the Balloon component.
   */
  renderArrow: (props: C & { points: Points; ref: Ref<HTMLElement> }) => React.ReactNode

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
function BalloonComponent<C extends Dictionary>(props: Props<C>, ref: ForwardedRef<HTMLElement>): JSX.Element {
  const { renderArrow, placement = 'tc', contentProps, children, ...divProps } = props
  const [containerEl, setContainerEl] = React.useState<HTMLElement | null>(null)
  const contentRef = useRef<HTMLElement>(null)

  return (
    <div
      {...divProps}
      ref={setRefs(setContainerEl, ref, syncSizes)}
      className={c(divProps.className, BalloonComponent.displayName)}
    >
      <Popover
        opened={true}
        placement={_getArrowPlacement(placement)}
        offset={calcArrowOffset(placement)}
        containerElement={containerEl}
        renderContent={renderArrow}
        renderTarget={forwardRef(function Element(_, targetRef) {
          return (
            <div {...contentProps} ref={setRefs(targetRef, contentRef, syncSizes)}>
              {children}
            </div>
          )
        })}
      />
    </div>
  )

  // private

  function syncSizes(): void {
    if (!containerEl || !contentRef.current) return
    const width = getStyle(contentRef.current)?.width
    const height = getStyle(contentRef.current)?.height
    assertDefined(width)
    assertDefined(height)
    containerEl.style.width = width
    containerEl.style.height = height
  }

  function _getArrowPlacement(placement: Point): Point {
    if (placement.charAt(0) === 'c') {
      return flipPointHorizontally(placement)
    }
    return flipPointVertically(placement)
  }
}

const Balloon = forwardRef(BalloonComponent)
Balloon.displayName = BalloonComponent.displayName
export default Balloon
