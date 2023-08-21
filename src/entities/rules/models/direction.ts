import { atom } from 'recoil'

export const directionAtom = atom<'up' | 'down'>({
  key: 'directionAtom',
  default: 'down',
})
