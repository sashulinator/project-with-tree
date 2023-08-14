import { atom } from 'recoil'

export type DraggableItem = {
  id: string
  value: string
  parentId: string
}

export const draggableItemAtom = atom<DraggableItem | null>({
  key: 'draggableItemAtom',
  default: null,
})
