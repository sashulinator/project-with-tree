import { atom } from 'recoil'

export const dragOverIdAtom = atom<string | null>({
  key: 'dragOverIdAtom',
  default: null,
})
