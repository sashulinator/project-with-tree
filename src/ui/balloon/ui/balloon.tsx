import './balloon.css'

import clsx from 'clsx'
import { Point, Points, flipPointHorizontally, flipPointVertically } from 'dom-align-ts'
import React from 'react'

import Popover from '~/ui/popover'
import { Any } from '~/utils/core'
import { useWindowSize } from '~/utils/hooks'
import { assertValidElement, setRefs } from '~/utils/react'

import { calcArrowOffset } from '../lib/calc-arrow-offset'
import { BalloonProps } from '../types/balloon-props'

/**
 * The `Balloon` component, which displays a message or other content with a tooltip-like style.
 *
 * @param {BalloonProps} props - The props to configure the balloon component.
 *
 * @returns {JSX.Element} - A `Balloon` JSX element.
 */

export default function Balloon(props: BalloonProps): JSX.Element {
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
      <Popover
        content={
          <div
            {...props.arrowProps}
            className={clsx('ui-Balloon_arrow', props.arrowProps?.className)}
            style={{ position: 'absolute', ...props.arrowProps?.style }}
          />
        }
        isOpen={true}
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
      </Popover>
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
