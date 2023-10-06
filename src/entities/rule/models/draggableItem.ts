import { atom } from 'recoil'

import { Id } from '~/utils/core'

import { SelectValue } from './editorRulesValues'

export type DraggableItem = {
  id: Id
  value: string
  parentId: Id
  condition: SelectValue
}

export const draggableItemAtom = atom<DraggableItem | null>({
  key: 'draggableItemAtom',
  default: null,
})
