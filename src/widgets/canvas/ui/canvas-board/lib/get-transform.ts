import { Translate } from '../../../types/translate'

export function getTransform(translate: Translate, scale: number): string {
  return `translate(${translate.x}px, ${translate.y}px) scale(${scale})`
}
