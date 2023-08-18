import { alignElement } from 'dom-align-ts'

import { AlignProps, Config, adjustPoints } from '..'

type Context = {
  config: Config
  targetElement: HTMLElement
  sourceElement: HTMLElement | null
  onAlignedRef: { current: AlignProps['onAligned'] }
}

export function _align(ctx: Context): void {
  if (!ctx.targetElement || !ctx.sourceElement) return

  const result = alignElement(ctx.sourceElement, ctx.targetElement, ctx.config)

  ctx.onAlignedRef.current?.({ ...result, adjustedPoints: adjustPoints(result) })
}
