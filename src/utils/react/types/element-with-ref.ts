import { ForwardedRef, JSXElementConstructor } from 'react'

export type ReactElementWithRef<
  R,
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>
> = React.ReactElement<P & { ref?: ForwardedRef<R> }, T> & { ref?: ForwardedRef<R> }
