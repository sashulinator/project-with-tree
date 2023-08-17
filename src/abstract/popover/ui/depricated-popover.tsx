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
import Align, { Offset, Overflow, Point, Points, onAligned } from '../../align'

Popover.displayName = 'a-Popover'

/**
 * Props for the `Popover` component, which displays a content over a target element.
 */
export interface Props {
  /**
   * The Element that displays the popover.
   */
  children: ReactElementWithRef<HTMLElement>

  /**
   * Flag indicating whether the popover is currently open.
   */
  opened: boolean | undefined

  /**
   * The content to be displayed in the popover.
   */
  content: ReactElementWithRef<HTMLElement>

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
}

/**
 * See README.md
 *
 * @param {Props} props - The props for the Popover component.
 * @returns {JSX.Element | null}
 */
export default function Popover(props: Props): JSX.Element {
  const points = props.placement ? toPoints(props.placement) : props.points ?? ['tc', 'bc']
  const sourceRef = React.useRef<null | HTMLDivElement>(null)
  const [childrenEl, setChildrenEl] = React.useState<null | HTMLElement>(null)

  useOnClickOutside(sourceRef, fns(props.onClickOutside, props.onClose))
  useEventListener('keydown', keyListener({ key: 'Escape' }, fns(props.onEscKeyDown, props.onClose)))

  assertValidElement(props.children)
  assertValidElement(props.content)

  const clonedChildren = React.cloneElement(props.children, { ref: setRefs(props.children.ref, setChildrenEl) })
  const clonedContent = React.cloneElement(props.content, { ref: setRefs(props.content.ref, sourceRef) })

  return (
    <>
      {clonedChildren}
      {props.opened && childrenEl && (
        <Align
          targetElement={childrenEl}
          points={points}
          overflow={props.overflow}
          containerElement={props.containerElement}
          deps={props.deps}
          offset={props.contentOffset}
          onAligned={props.onAligned}
        >
          {clonedContent}
        </Align>
      )}
    </>
  )
}
