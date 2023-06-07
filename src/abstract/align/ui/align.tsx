import { alignElement } from 'dom-align-ts'
import React, { useCallback, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

import { listenParentScrolls, observeResize } from '~/utils/dom'
import { useEventListener, useLatest } from '~/utils/hooks'
import { assertValidElement, setRefs } from '~/utils/react'

import { AlignProps } from '../types/align-props'

/**
 * A component for positioning an element relative to another element.
 *
 * @param {AlignProps} props - The props for the Align component.
 * @return {JSX.Element} The rendered Align component.
 */
export default function Align(props: AlignProps): JSX.Element {
  const { targetElement, children, containerElement, deps = [], onAligned, sourceOffset, ...config } = props
  const [sourceElement, setSourceEl] = React.useState<null | HTMLElement>(null)
  const onAlignedRef = useLatest(onAligned)

  assertValidElement(children)

  console.log(props.children)

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

Align.displayName = 'AbstractAlign'
