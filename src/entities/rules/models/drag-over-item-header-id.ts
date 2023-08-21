import { atom } from 'recoil'

export const dragOverItemHeaderIdAtom = atom<string | null>({
  key: 'dragOverItemHeaderIdAtom',
  default: null,
})
