import * as React from 'react'

import { adjustPoints, toPoints } from '..'
// https://github.com/sashulinator/utils-dom-events
import { keyListener } from '../../../utils/dom-event'
// https://github.com/sashulinator/utils-function
import { fns } from '../../../utils/function'
import { useEventListener, useOnClickOutside } from '../../../utils/hooks'
// https://github.com/sashulinator/utils-react
import type { ReactElementWithRef } from '../../../utils/react'
// https://github.com/sashulinator/a-align
import Align, { Offset, OnAligned, Overflow, Point, Points } from '../../align'

Popover.displayName = 'a-Popover'

type RenderProps = Props & { adjustedPoints: Points; ref: React.ForwardedRef<HTMLElement> }
type Render = (props: RenderProps) => JSX.Element | null

/**
 * Props for the `Popover` component, which displays a content over a target element.
 */
export interface Props {
  /**
   * Flag indicating whether the popover is currently open.
   */
  opened: boolean | undefined

  /**
   * Render target
   */
  renderTarget: Render

  /**
   * The content to be displayed in the popover.
   */
  renderContent: Render

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
   * An optional x/y offset for the content
   */
  offset?: Offset

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

  const sourceRef = React.useRef<null | HTMLElement>(null)
  const [childrenEl, setChildrenEl] = React.useState<null | HTMLElement>(null)
  const [adjustedPoints, setAdjustedPoints] = React.useState(points)

  const content = _getContent()
  const children = _getChildren()

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
          {content as ReactElementWithRef<HTMLElement>}
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

  function _getContent(): React.FunctionComponentElement<RenderProps> {
    return React.createElement(props.renderContent, {
      ref: sourceRef,
      adjustedPoints,
      ...props,
    })
  }

  function _getChildren(): React.FunctionComponentElement<RenderProps> {
    return React.createElement(props.renderTarget, {
      ref: setChildrenEl,
      adjustedPoints,
      ...props,
    })
  }
}
