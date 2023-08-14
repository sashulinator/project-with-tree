import { alignElement } from 'dom-align-ts'
import type { Offset, Points } from 'dom-align-ts'
import React, { useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import { listenParentScrolls, observeResize } from '~/utils/dom'
import { useEventListener, useLatest } from '~/utils/hooks'
import { assertValidElement, setRefs } from '~/utils/react'
import type { ReactElementWithRef } from '~/utils/react'

Align.displayName = 'a-Align'

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

export interface Props {
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

/**
 * A component for positioning an element relative to another element.
 *
 * @param {Props} props - The props for the Align component.
 * @return {JSX.Element} The rendered Align component.
 */
export default function Align(props: Props): JSX.Element {
  const { targetElement, children, containerElement, deps = [], onAligned, sourceOffset, ...config } = props
  const [sourceElement, setSourceEl] = React.useState<null | HTMLElement>(null)
  const onAlignedRef = useLatest(onAligned)

  assertValidElement(children)

  const align = useCallback(_align, [targetElement, sourceElement, containerElement, ...config.points, ...deps])

  useLayoutEffect(align, [align])
  useEventListener('resize', align, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(targetElement, align, { passive: true }), [align])
  useLayoutEffect(() => listenParentScrolls(sourceElement, align, { passive: true }), [align])
  useLayoutEffect(() => observeResize(targetElement, align), [align])
  useLayoutEffect(() => observeResize(sourceElement, align), [align])

  const clonedChildren = React.cloneElement(children, { ref: setRefs(children.ref, setSourceEl) })

  return <>{createPortal(clonedChildren, containerElement || targetElement.ownerDocument.body)}</>

  // Private

  function _align(): void {
    if (!targetElement || !sourceElement) return
    const ret = alignElement(sourceElement, targetElement, { ...config, offset: sourceOffset })
    onAlignedRef.current?.(ret)
  }
}
