import * as React from 'react'

import Align from '~/abstract/align'
import { Any } from '~/utils/core'
import { fns } from '~/utils/function'
import { useEventListener, useOnClickOutside } from '~/utils/hooks'
import { assertValidElement, setRefs } from '~/utils/react'

import { toPoints } from '../lib/to-points'
import { PopoverProps } from '../types/popover-props'

/**
 * The`Popover` component, which displays a content over a target element.
 *
 * @param {PopoverProps} props - The props for the Popover component.
 * @returns {JSX.Element | null}
 */
export default function Popover(props: PopoverProps): JSX.Element {
  const points = props.placement ? toPoints(props.placement) : props.points ?? ['tc', 'bc']
  const sourceRef = React.useRef<null | HTMLDivElement>(null)
  const [childrenEl, setChildrenEl] = React.useState<null | HTMLElement>(null)

  useOnClickOutside(sourceRef, fns(props.onClickOutside, props.onClose))
  useEventListener('keydown', handleEscKeyDown)

  assertValidElement(props.children)
  assertValidElement(props.content)

  const clonedChildren = React.cloneElement<Any>(props.children, { ref: setRefs(props.children.ref, setChildrenEl) })
  const clonedContent = React.cloneElement<Any>(props.content, { ref: setRefs(props.content.ref, sourceRef) })

  return (
    <>
      {clonedChildren}
      {props.isOpen && childrenEl && (
        <Align
          targetElement={childrenEl}
          points={points}
          overflow={props.overflow}
          containerElement={props.containerElement}
          deps={props.deps}
          sourceOffset={props.contentOffset}
          onAligned={props.onAligned}
        >
          {clonedContent}
        </Align>
      )}
    </>
  )

  // Private

  function handleEscKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      props.onEscKeyDown?.(e)
      props.onClose?.()
    }
  }
}

Popover.displayName = 'PopoverComponent'
