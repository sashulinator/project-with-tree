import { atom } from 'recoil'

export enum SelectValue {
  and = 'И',
  or = 'ИЛИ',
  not = 'НЕ',
  xor = 'ИСКЛ ИЛИ',
}

export type EditorItem = {
  id: string
  value: string
  condition: SelectValue
}

export type EditorValues = {
  id: string
  valueArr: EditorItem[]
  condition: SelectValue
}

export const editorRulesValuesAtom = atom<EditorValues[]>({
  key: 'editorRulesValues',
  default: [
    {
      id: '5',
      valueArr: [
        { id: '3', value: '', condition: SelectValue.and },
        { id: '4', value: '', condition: SelectValue.and },
      ],
      condition: SelectValue.and,
    },
    {
      id: '6',
      valueArr: [{ id: '7', value: '', condition: SelectValue.and }],
      condition: SelectValue.and,
    },
  ],
})
