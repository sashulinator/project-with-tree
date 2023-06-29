import { Offset } from './types/offset'

type Element = Pick<HTMLElement, 'getBoundingClientRect'>

export function getOffsetInElement(el: HTMLElement | null, parentEl: HTMLElement | null | undefined): Offset {
  const offset = { top: 0, left: 0 }
  if (!el || !parentEl) return offset

  offset.top = el.offsetTop - parentEl.offsetTop
  offset.left = el.offsetLeft - parentEl.offsetLeft

  return offset
}
