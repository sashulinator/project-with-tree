import { atom } from 'recoil'

export const dragOverButtonsIdAtom = atom<string | null>({
  key: 'dragOverButtonsIdAtom',
  default: null,
})
