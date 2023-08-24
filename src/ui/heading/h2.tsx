import React, { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

H2Component.displayName = 'ui-H2'

export function H2Component(props: H1Props, ref: ForwardedRef<HTMLHeadingElement>): JSX.Element {
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h2 {...props} className={c(props.className, H2Component.displayName)} ref={ref} />
}

const H2 = forwardRef(H2Component)
export { H2 }
