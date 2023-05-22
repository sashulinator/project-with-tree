import { Offset } from './types/offset'

export function getOffsetInElement(el: HTMLElement | null, inEl: HTMLElement | null | undefined): Offset {
  const offset = { top: 0, left: 0 }
  if (!el || !inEl) return offset

  offset.top = el.offsetTop - inEl.offsetTop
  offset.left = el.offsetLeft - inEl.offsetTop

  return offset
}
