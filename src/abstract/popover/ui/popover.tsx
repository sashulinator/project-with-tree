import React, { Ref, createElement } from 'react'

import { Any, Dictionary, c } from '~/utils/core'

import { toPoints } from '..'
// https://github.com/sashulinator/utils-dom-events
import { keyListener } from '../../../utils/dom-event'
// https://github.com/sashulinator/utils-function
import { fns } from '../../../utils/function'
import { useEventListener, useOnClickOutside } from '../../../utils/hooks'
// https://github.com/sashulinator/utils-react
import { type ReactElementWithRef, setRefs } from '../../../utils/react'
// https://github.com/sashulinator/a-align
import Align, { Offset, OnAligned, Overflow, Point, Points } from '../../align'

Popover.displayName = 'a-Popover'

/**
 * Props for the `Popover` component, which displays a content over a target element.
 */
export interface Props<C extends Dictionary, T extends Dictionary> {
  /**
   * Classnames
   */
  className?: string | undefined

  /**
   * Flag indicating whether the popover is currently open.
   */
  opened: boolean | undefined

  /**
   * Render target
   */
  renderTarget: (props: T & { opened: boolean; points: Points; ref: Ref<HTMLElement> }) => React.ReactNode

  /**
   * Props will be passed to `renderContent`
   */
  targetProps?: T | undefined

  /**
   * The content to be displayed in the popover.
   */
  renderContent: (props: C & { points: Points; className: string; ref: Ref<HTMLElement> }) => React.ReactNode

  /**
   * Props will be passed to `renderContent`
   */
  contentProps?: C | undefined

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
  offset?: Offset | undefined

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
export default function Popover<C extends Dictionary, T extends Dictionary>(props: Props<C, T>): JSX.Element {
  const { points, placement, containerElement, ...alignProps } = props
  const newPoints = _getPoints()

  const [sourceElement, setSourceElement] = React.useState<null | Element>(null)
  const [targetElement, setTargetElement] = React.useState<null | HTMLElement>(null)

  const className = c(props.className, props.contentProps?.className, Popover.displayName)

  const content =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    createElement(props.renderContent, { ...props.contentProps, className, ref: setRefs(setSourceElement) } as Any)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const target = createElement(props.renderTarget, { ...props.targetProps, ref: setRefs(setTargetElement) } as Any)

  useOnClickOutside({ current: sourceElement }, fns(props.onClickOutside, props.onClose))
  useEventListener('keydown', keyListener({ key: 'Escape' }, fns(props.onEscKeyDown, props.onClose)))

  return (
    <>
      {target}
      {props.opened && targetElement && (
        <Align {...alignProps} targetElement={targetElement} containerElement={containerElement} points={newPoints}>
          {content as ReactElementWithRef<HTMLElement>}
        </Align>
      )}
    </>
  )

  // Private

  function _getPoints(): Points {
    if (points) return points
    if (placement) return toPoints(placement)
    return ['tc', 'bc']
  }
}
