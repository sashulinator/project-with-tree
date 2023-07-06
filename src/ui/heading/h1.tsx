import { clsx } from 'clsx'
import React, { ForwardedRef, forwardRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

H1Component.displayName = 'ui-H1'

export function H1Component(props: H1Props, ref: ForwardedRef<HTMLHeadingElement>): JSX.Element {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h1 {...props} className={clsx(props.className, H1Component.displayName)} ref={ref} />
}

const H1 = forwardRef(H1Component)
export { H1 }
