import { Offset } from './types/offset'

interface Element {
  offsetTop: number
  offsetLeft: number
}

export function getOffsetInElement(el: Element | null, inEl: Element | null | undefined): Offset {
  const offset = { top: 0, left: 0 }
  if (!el || !inEl) return offset

  offset.top = el.offsetTop - inEl.offsetTop
  offset.left = el.offsetLeft - inEl.offsetTop

  return offset
}
