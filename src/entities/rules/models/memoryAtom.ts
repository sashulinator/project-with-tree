import { atom } from 'recoil'
import { EditorValues } from './editorRulesValuesAtom'

export const memoryAtom = atom<EditorValues[][]>({
  key: 'memoryAtom',
  default: [[{ id: '5', valueArr: [{ id: '3', value: '' }] }]],
})
