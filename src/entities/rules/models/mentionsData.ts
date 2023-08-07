import { atom } from 'recoil'
import { MentionsItem } from '../ui/editor/widgets/item/widgets/input/ui/input'

export const mentionsDataAtom = atom<MentionsItem[]>({
  key: 'mentionsDataAtom',
  default: [],
})
