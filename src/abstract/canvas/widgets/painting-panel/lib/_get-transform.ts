import { Position } from '~/utils/core'

export function getTransform(translate: Position, scale: number): string {
  return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
}
