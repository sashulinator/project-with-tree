import { atom } from 'recoil'
import { IAttribute } from '~/entities/rules/types/rules-type'

export const activeAttributeAtom = atom<IAttribute | null>({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})
