import { alignElement } from 'dom-align-ts'
import type { Offset, Points } from 'dom-align-ts'
import React, { useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

// https://github.com/sashulinator/utils-core
import { curry } from '../../../utils/core'
// https://github.com/sashulinator/utils-dom
import { listenParentScrolls, observeResize } from '../../../utils/dom'
// https://github.com/sashulinator/utils-hooks
import { useEventListener, useLatest } from '../../../utils/hooks'
// https://github.com/sashulinator/utils-react
import { assertValidElement, setRefs } from '../../../utils/react'
import type { ReactElementWithRef } from '../../../utils/react'
import { _align } from '../_private'

Align.displayName = 'a-Align'

export type AlignResult = ReturnType<typeof alignElement> & { adjustedPoints: Points }

export type OnAligned = (ret: AlignResult) => void

/**
 * Configuration options for handling positioning when the content overflows the container.
 */
export interface Overflow {
  /**
   * Flag to shift the child element into the viewport until it is entirely visible; defaults to false.
   */
  alwaysByViewport?: boolean

  /**
   * Flag to reposition the child element along the x axis to ensure it is visible; defaults to false.
   */
  adjustX?: boolean

  /**
   * Flag to reposition the child element along the y axis to ensure it is visible; defaults to false.
   */
  adjustY?: boolean
}

/**
 * Config of `align` function from `dom-align-ts` library
 */
export interface Config {
  /**
   * An Array that specifies the positioning of the child element relative to the target element.
   */
  points: Points

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
   * An optional x/y offset for the child element.
   */
  offset?: Offset | undefined
}

export interface Props extends Config {
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
   * An optional array of dependencies used to trigger repositioning of the child element.
   */
  deps?: unknown[] | undefined

  /**
   * An optional flag to use CSS `bottom` property instead of `top`.
   */
  useCssBottom?: boolean | undefined

  /**
   *  An optional function to be called after the child element is positioned.
   */
  onAligned?: OnAligned | undefined
}

/**
 * See README.md
 *
 * @param {Props} props - The props for the Align component.
 * @return {JSX.Element} The rendered Align component.
 */
export default function Align(props: Props): JSX.Element {
  const { targetElement, children, containerElement, deps = [], onAligned, ...config } = props
  const [sourceElement, setSourceEl] = React.useState<null | HTMLElement>(null)
  const onAlignedRef = useLatest(onAligned)

  const alignDeps = [targetElement, sourceElement, containerElement, config.points[0], config.points[1], ...deps]

  assertValidElement(children)

  const align = useCallback(() => curry(_align)({ targetElement, sourceElement, config, onAlignedRef }), alignDeps)

  useLayoutEffect(align, [alignDeps])
  useEventListener('resize', align, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(targetElement, align, { passive: true }), [alignDeps])
  useLayoutEffect(() => listenParentScrolls(sourceElement, align, { passive: true }), [alignDeps])
  useLayoutEffect(() => observeResize(targetElement, align), [alignDeps])
  useLayoutEffect(() => observeResize(sourceElement, align), [alignDeps])

  const clonedChildren = React.cloneElement(children, { ref: setRefs(children.ref, setSourceEl) })

  return createPortal(clonedChildren as any, containerElement || targetElement.ownerDocument.body)
}
