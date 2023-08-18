import { ForwardedRef, cloneElement, createElement, forwardRef, useRef } from 'react'

import { assertDefined, c } from '~/utils/core'
import { getStyle } from '~/utils/dom'
import { ReactElementWithRef, setRefs } from '~/utils/react'

FitContentComponent.displayName = 'a-FitContent'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  children: ReactElementWithRef<HTMLElement>
}

/**
 * Fit content
 */
function FitContentComponent(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element {
  const { as = 'div', ...restProps } = props

  const containerRef = useRef<HTMLElement>(null)
  const elementRef = useRef<HTMLElement>(null)

  const clonedChildren = cloneElement(props.children, { ref: setRefs(props.children.ref, elementRef, sync) })

  return createElement(
    as,
    {
      ...restProps,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref: setRefs(ref, containerRef, sync),
      className: c(props.className, FitContent.displayName),
    },
    clonedChildren
  )

  function sync(): void {
    if (!containerRef.current || !elementRef.current) return
    const width = getStyle(elementRef.current)?.width
    const height = getStyle(elementRef.current)?.height
    assertDefined(width)
    assertDefined(height)
    containerRef.current.style.width = width
    containerRef.current.style.height = height
  }
}

const FitContent = forwardRef(FitContentComponent)
FitContent.displayName = FitContentComponent.displayName
export default FitContent
