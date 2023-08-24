import { atom } from 'recoil'

export type DraggableCard = {
  id: string
  name: string
  type: 'domain' | 'attribute'
}

export const draggableCardAtom = atom<DraggableCard | null>({
  key: 'draggableCardAtom',
  default: null,
})
