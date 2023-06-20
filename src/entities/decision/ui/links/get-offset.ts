import { Id, Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'

export function getOffset(id: Id | undefined, el: Element | null | undefined, scale: number): Offset | null {
  if (!id) return null

  const jointEl = el?.querySelector(`[data-link-id="${id.toString()}"]`)

  if (!jointEl || !el) return null

  const OffsetInElement = getOffsetInElement(jointEl, el)
  const jointRect = jointEl?.getBoundingClientRect() || { height: 0 }

  const ret = {
    left: (OffsetInElement.left + jointRect.width / 2) / scale,
    top: (OffsetInElement.top + jointRect.height / 2) / scale,
  }

  return ret
}
