import { ForwardedRef, cloneElement, createElement, forwardRef } from 'react'

import { c } from '~/utils/core'
import { useMeasure } from '~/utils/hooks'
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

  const [setRef, size] = useMeasure()

  const clonedChildren = cloneElement(props.children, { ref: setRefs(props.children.ref, setRef) })

  return createElement(
    as,
    {
      ...restProps,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref: setRefs(ref),
      className: c(props.className, FitContent.displayName),
      style: { ...size, ...props.style },
    },
    clonedChildren
  )
}

const FitContent = forwardRef(FitContentComponent)
FitContent.displayName = FitContentComponent.displayName
export default FitContent
