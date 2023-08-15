import { alignElement } from 'dom-align-ts'

import { AlignProps, Config } from '..'

type Context = {
  config: Config
  targetElement: HTMLElement
  sourceElement: HTMLElement | null
  onAlignedRef: { current: AlignProps['onAligned'] }
}

export function align(ctx: Context): void {
  if (!ctx.targetElement || !ctx.sourceElement) return

  const ret = alignElement(ctx.sourceElement, ctx.targetElement, ctx.config)

  ctx.onAlignedRef.current?.(ret)
}
