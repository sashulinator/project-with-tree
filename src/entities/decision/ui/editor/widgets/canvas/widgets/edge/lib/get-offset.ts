import { Id, Offset } from '~/utils/core'
import { getOffsetInElement } from '~/utils/dom'

export function getOffset(
  edgeId: Id | undefined,
  nodeEl: Element | null | undefined,
  scale: number,
  offsetX: number
): Offset | null {
  if (!edgeId) return null

  const jointEl = nodeEl?.querySelector(`[data-edge-id="${edgeId.toString()}"]`) as HTMLElement

  if (!jointEl || !nodeEl) return null

  const OffsetInElement = getOffsetInElement(jointEl, nodeEl as HTMLElement)
  const jointRect = jointEl?.getBoundingClientRect() || { height: 0 }

  const ret = {
    left: OffsetInElement.left + jointRect.width / 2 / scale + offsetX,
    top: OffsetInElement.top + jointRect.height / 2 / scale,
  }

  return ret
}
