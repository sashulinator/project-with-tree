import * as React from 'react'

import { toPoints } from '..'
// https://github.com/sashulinator/utils-dom-events
import { keyListener } from '../../../utils/dom-event'
// https://github.com/sashulinator/utils-function
import { fns } from '../../../utils/function'
import { useEventListener, useOnClickOutside } from '../../../utils/hooks'
// https://github.com/sashulinator/utils-react
import { assertValidElement, setRefs } from '../../../utils/react'
import type { ReactElementWithRef } from '../../../utils/react'
// https://github.com/sashulinator/a-align
import Align, { Offset, OnAligned, Overflow, Point, Points } from '../../align'
import { adjustPoints } from '../lib/adjust-placement'

Popover.displayName = 'a-Popover'

/**
 * Props for the `Popover` component, which displays a content over a target element.
 */
export interface Props {
  /**
   * The Element that displays the popover.
   */
  children?: ReactElementWithRef<HTMLElement>

  renderTarget?:
    | ((props: { ref: React.ForwardedRef<HTMLElement> } & Props & { adjustedPoints: Points }) => JSX.Element | null)
    | undefined

  /**
   * Flag indicating whether the popover is currently open.
   */
  opened: boolean | undefined

  /**
   * The content to be displayed in the popover.
   */
  content?: ReactElementWithRef<HTMLElement>

  /**
   * The content to be displayed in the popover.
   */
  renderContent?:
    | ((props: { ref: React.ForwardedRef<HTMLElement> } & Props & { adjustedPoints: Points }) => JSX.Element | null)
    | undefined

  /**
   * An optional x/y offset for the content
   */
  offset?: Offset

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
  onAligned?: OnAligned | undefined
}

/**
 * See README.md
 *
 * @param {Props} props - The props for the Popover component.
 * @returns {JSX.Element | null}
 */
export default function Popover(props: Props): JSX.Element {
  const points = _getPoints()
  const content = _getContent()
  const children = _getChildren()

  const sourceRef = React.useRef<null | HTMLElement>(null)
  const [childrenEl, setChildrenEl] = React.useState<null | HTMLElement>(null)
  const [adjustedPoints, setAdjustedPoints] = React.useState(points)

  useOnClickOutside(sourceRef, fns(props.onClickOutside, props.onClose))
  useEventListener('keydown', keyListener({ key: 'Escape' }, fns(props.onEscKeyDown, props.onClose)))

  return (
    <>
      {children}
      {props.opened && childrenEl && (
        <Align
          onAligned={fns(props.onAligned, (ret) => setAdjustedPoints(adjustPoints({ ...ret, adjustedPoints })))}
          targetElement={childrenEl}
          points={points}
          overflow={props.overflow}
          containerElement={props.containerElement}
          deps={props.deps}
          offset={props.offset}
        >
          {content}
        </Align>
      )}
    </>
  )

  // Private

  function _getPoints(): Points {
    if (props.points) return props.points
    if (props.placement) return toPoints(props.placement)
    return ['tc', 'bc']
  }

  function _getContent(): ReactElementWithRef<HTMLElement> {
    if (props.renderContent) {
      return React.createElement(props.renderContent, {
        ref: sourceRef,
        adjustedPoints,
        ...props,
      }) as ReactElementWithRef<HTMLElement>
    }

    assertValidElement(props.content)
    return React.cloneElement(props.content, { ref: setRefs(props.content.ref, sourceRef) })
  }

  function _getChildren(): ReactElementWithRef<HTMLElement> {
    if (props.renderTarget) {
      return React.createElement(props.renderTarget, {
        ref: setChildrenEl,
        adjustedPoints,
        ...props,
      }) as ReactElementWithRef<HTMLElement>
    }

    assertValidElement(props.children)
    return React.cloneElement(props.children, { ref: setRefs(props.children.ref, setChildrenEl) })
  }
}
