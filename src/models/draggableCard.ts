import { atom } from 'recoil'

import { Id } from '~/utils/core'

export type DraggableCard = {
  id: Id
  name: string
  type: 'domain' | 'attribute'
}

export const draggableCardAtom = atom<DraggableCard | null>({
  key: 'draggableCardAtom',
  default: null,
})
