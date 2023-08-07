import { atom } from 'recoil'

export type DraggableCard = {
  id: string
  name: string
}

export const draggableCardAtom = atom<DraggableCard | null>({
  key: 'draggableCardAtom',
  default: null,
})
