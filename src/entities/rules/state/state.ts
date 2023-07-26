import { atom } from 'recoil'
import { MentionsItem } from '../ui/editor-rules/editor-input'

type draggableCardType = {
  id: string
  name: string
}

export const draggableCardAtom = atom<draggableCardType | null>({
  key: 'draggableCardAtom',
  default: null,
})

type editorRulesValuesType = {
  id: number
  value: string
}

export const editorRulesValuesAtom = atom<editorRulesValuesType[]>({
  key: 'editorRulesValues',
  default: [{ id: 1, value: '' }],
})

export const mentionsDataAtom = atom<MentionsItem[]>({
  key: 'mentionsDataAtom',
  default: [],
})
