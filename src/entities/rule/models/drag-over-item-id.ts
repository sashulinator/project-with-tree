import { atom } from 'recoil'

import { Id } from '~/utils/core'

export const dragOverItemIdAtom = atom<Id | null>({
  key: 'dragOverItemIdAtom',
  default: null,
})
