import { atom } from 'recoil'

export const dragOverItemIdAtom = atom<string | null>({
  key: 'dragOverItemIdAtom',
  default: null,
})
