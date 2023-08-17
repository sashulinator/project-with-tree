import './balloon.css'

import { clsx } from 'clsx'
import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import React, { RefAttributes } from 'react'

import { DepricatedPopover } from '~/abstract/popover'
import { Any } from '~/utils/core'
import { useWindowSize } from '~/utils/hooks'
import { ReactElementWithRef, assertValidElement, setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'

/**
 *  Props for the `Balloon` component, which displays a message or other content with a tooltip-like style.
 */
export interface Props {
  /**
   * Props to be passed to the root element of the Balloon component.
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * Props to be passed to the content element of the Balloon component.
   */
  contentProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * Props to be passed to the arrow element of the Balloon component.
   */
  arrowProps?: React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

  /**
   * The position of the balloon relative to its target element. The arrow of the balloon is calculated based on this prop.
   */
  placement?: Point

  /**
   * The child element to be displayed within the balloon component.
   */
  children: ReactElementWithRef<HTMLElement>
}

/**
 * The `Balloon` component, which displays a message or other content with a tooltip-like style.
 *
 * @param {Props} props - The props to configure the balloon component.
 *
 * @returns {JSX.Element} - A `Balloon` JSX element.
 */

export default function Balloon(props: Props): JSX.Element {
  const [childrenEl, setChildrenEl] = React.useState<HTMLElement | null>(null)
  const [contentEl, setContentEl] = React.useState<HTMLElement | null>(null)
  const { placement = 'tc' } = props

  const rect = childrenEl?.getBoundingClientRect()

  useWindowSize()

  assertValidElement(props.children)
  const clonedChildren = React.cloneElement<Any>(props.children, { ref: setRefs(props.children.ref, setChildrenEl) })

  return (
    <div
      {...props.rootProps}
      ref={setRefs(setContentEl, props.contentProps?.ref)}
      style={{ height: rect?.height, width: rect?.width, ...props.rootProps?.style }}
      className={clsx('ui-Balloon', props.rootProps?.className)}
    >
      <DepricatedPopover
        content={
          <div
            {...props.arrowProps}
            className={clsx('ui-Balloon_arrow', props.arrowProps?.className)}
            style={{ position: 'absolute', ...props.arrowProps?.style }}
          />
        }
        opened={true}
        containerElement={contentEl}
        points={toPoints(placement)}
        contentOffset={calcArrowOffset(placement)}
        deps={[props.placement]}
      >
        <div
          {...props.contentProps}
          className={clsx('ui-Balloon_content', props.contentProps?.className)}
          style={{ position: 'absolute', ...props.contentProps?.style }}
        >
          {clonedChildren}
        </div>
      </DepricatedPopover>
    </div>
  )

  // Private

  function toPoints(placement: Point): Points {
    if (placement.charAt(0) === 'c') {
      return [placement, flipPointHorizontally(placement)]
    }
    return [placement, flipPointVertically(placement)]
  }
}
