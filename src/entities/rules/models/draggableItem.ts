import { atom } from 'recoil'

import { SelectValue } from './editorRulesValues'

export type DraggableItem = {
  id: string
  value: string
  parentId: string
  condition: SelectValue
}

export const draggableItemAtom = atom<DraggableItem | null>({
  key: 'draggableItemAtom',
  default: null,
})
