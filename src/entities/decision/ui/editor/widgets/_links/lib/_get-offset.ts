import { Id, Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'

export function getOffset(linkId: Id | undefined, nodeEl: Element | null | undefined): Offset | null {
  if (!linkId) return null

  const jointEl = nodeEl?.querySelector(`[data-link-id="${linkId.toString()}"]`) as HTMLElement

  if (!jointEl || !nodeEl) return null

  const OffsetInElement = getOffsetInElement(jointEl, nodeEl as HTMLElement)
  const jointRect = jointEl?.getBoundingClientRect() || { height: 0 }

  const ret = {
    left: OffsetInElement.left + jointRect.width / 2,
    top: OffsetInElement.top + jointRect.height / 2,
  }

  return ret
}
