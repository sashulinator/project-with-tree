import { alignElement } from 'dom-align-ts'
import type { Offset, Points } from 'dom-align-ts'
import React, { useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import { curry } from '~/utils/core'
import { listenParentScrolls, observeResize } from '~/utils/dom'
import { useEventListener, useLatest } from '~/utils/hooks'
import { assertValidElement, setRefs } from '~/utils/react'
import type { ReactElementWithRef } from '~/utils/react'

import { align } from '../_private'

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
  onAligned?: ((ret: ReturnType<typeof alignElement>) => void) | undefined
}

/**
 * A component for positioning an element relative to another element.
 *
 * @param {Props} props - The props for the Align component.
 * @return {JSX.Element} The rendered Align component.
 */
export default function Align(props: Props): JSX.Element {
  const { targetElement, children, containerElement, deps = [], onAligned, ...config } = props
  const [sourceElement, setSourceEl] = React.useState<null | HTMLElement>(null)
  const onAlignedRef = useLatest(onAligned)

  const alignDeps = [targetElement, sourceElement, containerElement, ...config.points, ...deps]

  assertValidElement(children)

  const carryAlign = useCallback(() => curry(align)({ targetElement, sourceElement, config, onAlignedRef }), alignDeps)

  useLayoutEffect(carryAlign, [alignDeps])
  useEventListener('resize', carryAlign, undefined, { passive: true })
  useLayoutEffect(() => listenParentScrolls(targetElement, carryAlign, { passive: true }), [alignDeps])
  useLayoutEffect(() => listenParentScrolls(sourceElement, carryAlign, { passive: true }), [alignDeps])
  useLayoutEffect(() => observeResize(targetElement, carryAlign), [alignDeps])
  useLayoutEffect(() => observeResize(sourceElement, carryAlign), [alignDeps])

  const clonedChildren = React.cloneElement(children, { ref: setRefs(children.ref, setSourceEl) })

  return <>{createPortal(clonedChildren, containerElement || targetElement.ownerDocument.body)}</>
}
