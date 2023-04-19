import { alignElement } from 'dom-align-ts'
import type { Offset, Points } from 'dom-align-ts'

import type { ReactElementWithRef } from '~/utils/react'

import { Overflow } from './overflow'

export interface AlignProps {
  /**
   * The target element to align the child element with.
   */
  targetElement: HTMLElement

  /**
   * The container element for the component; defaults to `document.body`.
   */
  containerElement?: HTMLElement | null | undefined

  /**
   * The child element to be positioned.
   */
  children: ReactElementWithRef<HTMLElement>

  /**
   * An Array that specifies the positioning of the child element relative to the target element.
   */
  points: Points

  /**
   * An optional array of dependencies used to trigger repositioning of the child element.
   */
  deps?: unknown[] | undefined

  /**
   * An optional x/y offset for the child element.
   */
  sourceOffset?: Offset | undefined

  /**
   * An optional x/y offset for the target element
   */
  targetOffset?: Offset | undefined

  /**
   * An optional configuration to handle positioning when the content overflows the container.
   */
  overflow?: Overflow | undefined

  /**
   * An optional flag to use CSS `right` property instead of `left`.
   */
  useCssRight?: boolean | undefined

  /**
   * An optional flag to use CSS `bottom` property instead of `top`.
   */
  useCssBottom?: boolean | undefined

  /**
   * An optional flag to use CSS `transform` property instead of `left`, `top`.
   */
  useCssTransform?: boolean | undefined

  /**
   * An optional flag to ignore shaking of the child element when repositioning.
   */
  ignoreShake?: boolean | undefined

  /**
   *  An optional function to be called after the child element is positioned.
   */
  onAligned?: ((ret: ReturnType<typeof alignElement>) => void) | undefined
}
