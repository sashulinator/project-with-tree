import { atom } from 'recoil'

import { Id } from '~/utils/core'

export enum SelectValue {
  and = 'and',
  or = 'or',
  not = 'not',
  xor = 'xor',
}

export type EditorItem = {
  id: Id
  value: string
  condition: SelectValue
}

export type EditorValues = {
  id: Id
  valueArr: EditorItem[]
  condition: SelectValue
}

export const editorRulesValuesAtom = atom<EditorValues[]>({
  key: 'editorRulesValues',
  default: [
    {
      id: '5',
      valueArr: [{ id: '3', value: '', condition: SelectValue.and }],
      condition: SelectValue.and,
    },
  ],
})
