import { ForwardedRef, createElement, useState } from 'react'

import { adjustPlacement } from '..'
import type { Offset, Overflow, Point, Points, onAligned } from '..'
import type { ReactElementWithRef } from '../../../utils/react'
import Popover from '../../popover'

Callout.displayName = 'a-Callout'

export interface ContentProp {
  placement: Point
  ref: ForwardedRef<HTMLElement>
}

export interface Props<TContentProp> {
  /**
   * Target
   */
  children: ReactElementWithRef<HTMLElement>

  /**
   * Flag indicating whether the popover is currently open.
   */
  opened: boolean | undefined

  /**
   * An optional x/y offset for the content
   */
  contentOffset?: Offset

  /**
   * An Array that specifies the positioning of the popover relative to its trigger element.
   */
  points?: Points | undefined

  /**
   * A string that specifies the placement of the popover relative to its trigger element.
   */
  placement?: Point | undefined

  /**
   * The container element for the component; defaults to `document.body`.
   */
  containerElement?: HTMLElement | null | undefined

  /**
   * An optional configuration to handle positioning when the content overflows the container.
   */
  overflow?: Overflow | undefined

  /**
   * An optional array of dependencies used to trigger repositioning of the child element.
   */
  deps?: unknown[] | undefined

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
  onAligned?: onAligned | undefined
  /**
   * Content Props
   */
  contentProps: TContentProp

  /*
   * Content Component
   */
  renderContent: (props: ContentProp & TContentProp) => JSX.Element | null
}

/**
 * See README.md
 */
export default function Callout<TContentProp>(props: Props<TContentProp>): JSX.Element {
  const { placement = 'bc', ...popoverProps } = props
  const [isXAdjusted, setXAdjusted] = useState(false)
  const [isYAdjusted, setYAdjusted] = useState(false)
  const adjustedPlacement = adjustPlacement(placement, { x: isXAdjusted, y: isYAdjusted })

  const content = createElement(props.renderContent, {
    ...props.contentProps,
    placement: adjustedPlacement,
    // Complains about `ref` prop, but it will be passed in Popover
  } as ContentProp & TContentProp)

  return (
    <Popover
      {...popoverProps}
      placement={placement}
      // Complains about `ref` prop, but it will be passed in Popover
      content={content as ReactElementWithRef<HTMLElement>}
      onAligned={(ret): void => {
        setXAdjusted(ret.isXAdjusted)
        setYAdjusted(ret.isYAdjusted)
      }}
    >
      {props.children}
    </Popover>
  )
}
