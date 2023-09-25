import { atom } from 'recoil'

import { Id } from '~/utils/core'

export const dragOverButtonsIdAtom = atom<Id | null>({
  key: 'dragOverButtonsIdAtom',
  default: null,
})
