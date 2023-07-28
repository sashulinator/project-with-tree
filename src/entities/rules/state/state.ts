import { atom } from 'recoil'
import { MentionsItem } from '../ui/editor-input/editor-input'

export type draggableCardType = {
  id: string
  name: string
}

export const draggableCardAtom = atom<draggableCardType | null>({
  key: 'draggableCardAtom',
  default: null,
})

export type editorRulesItemType = {
  id: string
  value: string
}

export type editorRulesValuesType = {
  id: string
  valueArr: editorRulesItemType[]
  checked?: boolean
}

export const editorRulesValuesAtom = atom<editorRulesValuesType[]>({
  key: 'editorRulesValues',
  default: [
    {
      id: '4',
      valueArr: [
        { id: '1', value: '' },
        { id: '2', value: '' },
      ],
    },
    { id: '5', valueArr: [{ id: '3', value: '' }] },
  ],
})

export const mentionsDataAtom = atom<MentionsItem[]>({
  key: 'mentionsDataAtom',
  default: [],
})

export const checkedItemsAtom = atom<editorRulesItemType[][]>({ key: 'checkedItemsAtom', default: [] })
