import { atom } from 'recoil'

type AtomType = {
  id: string
  name: string
}

export const draggableCardAtom = atom<AtomType | null>({
  key: 'draggableCardAtom',
  default: null,
})
