import { alignElement } from 'dom-align-ts'

import { Config, OnAligned } from '../ui/align'
import { adjustPoints } from './adjust-points'

type Context = {
  config: Config
  targetElement: HTMLElement
  sourceElement: HTMLElement | null
  onAlignedRef: { current?: OnAligned | undefined }
}

export function _align(ctx: Context): void {
  if (!ctx.targetElement || !ctx.sourceElement) return

  const result = alignElement(ctx.sourceElement, ctx.targetElement, ctx.config)

  ctx.onAlignedRef.current?.({ ...result, adjustedPoints: adjustPoints(result) })
}
