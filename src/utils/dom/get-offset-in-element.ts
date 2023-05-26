import { Offset } from './types/offset'

type Element = Pick<HTMLElement, 'getBoundingClientRect'>

export function getOffsetInElement(el: Element | null, inEl: Element | null | undefined): Offset {
  const offset = { top: 0, left: 0 }
  if (!el || !inEl) return offset

  const elRect = el.getBoundingClientRect()
  const inElRect = inEl.getBoundingClientRect()

  offset.top = elRect.top - inElRect.top
  offset.left = elRect.left - inElRect.left

  return offset
}
