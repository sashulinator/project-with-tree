import { atom } from 'recoil'

import { Id } from '~/utils/core'

export const dragOverItemHeaderIdAtom = atom<Id | null>({
  key: 'dragOverItemHeaderIdAtom',
  default: null,
})
