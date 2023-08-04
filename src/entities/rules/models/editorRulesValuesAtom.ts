import { atom } from 'recoil'

export type EditorItem = {
  id: string
  value: string
}

export type EditorValues = {
  id: string
  valueArr: EditorItem[]
  checked?: boolean
}

export const editorRulesValuesAtom = atom<EditorValues[]>({
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
