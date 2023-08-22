import { atom } from 'recoil'

export const dragOverHeaderAtom = atom<boolean>({
  key: 'dragOverHeaderAtom',
  default: false,
})
