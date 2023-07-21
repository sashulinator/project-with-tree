import { atom } from 'recoil'
import { AttributeProps } from '~/entities/rules/types/rules-type'

export const activeAttributeAtom = atom<AttributeProps | null>({
  key: 'activeAttributeAtom',
  default: null,
})
