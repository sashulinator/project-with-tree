import { Offset, Point, Points, alignElement } from 'dom-align-ts'

import { Overflow } from '~/ui/align'
import { ReactElementWithRef } from '~/utils/react'

/**
 * Props for the `Popover` component, which displays a content over a target element.
 */
export interface PopoverProps {
  /**
   * The Element that displays the popover.
   */
  children: ReactElementWithRef<HTMLElement>

  /**
   * Flag indicating whether the popover is currently open.
   */
  isOpen: boolean | undefined

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
  onClose?: (() => void) | undefined

  /**
   * A function that is called when a click or touch event occurs outside the popover.
   */
  onClickOutside?: ((e: MouseEvent | TouchEvent) => void) | undefined

  /**
   * A function that is called when an escape key or touch event occurs.
   */
  onEscKeyDown?: ((e: KeyboardEvent | TouchEvent) => void) | undefined

  /**
   *  An optional function to be called after the child element is positioned.
   */
  onAligned?: ((ret: ReturnType<typeof alignElement>) => void) | undefined
}
