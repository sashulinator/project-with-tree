import { atom } from 'recoil'

export type EditorItem = {
  id: string
  value: string
}

export type EditorValues = {
  id: string
  valueArr: EditorItem[]
}

export const editorRulesValuesAtom = atom<EditorValues[]>({
  key: 'editorRulesValues',
  default: [{ id: '5', valueArr: [{ id: '3', value: '' }] }],
})
