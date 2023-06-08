import clr from 'color'

import { Pass, check } from '~/utils/types/test'
import { Theme } from '~/widgets/theme/types/theme'

const primary = clr('#027ffe')
const color = clr('#b2bac2')
const bg = clr('#202124')
const bgSecondary = clr('#303134')

export const dark = {
  primary,
  color,
  bg,
  bgSecondary,

  caretColor: clr('yellow'),

  selectionColor: color,
  selectionBg: clr('yellow'),

  outlineColor: primary.alpha(0.5),
  borderColor: clr('#265d97'),

  errorColor: clr('#d2302f'),
}

// TODO сделать нормальную проверку
check<keyof Theme, keyof Theme, Pass>({} as keyof typeof dark)
check<keyof typeof dark, keyof typeof dark, Pass>({} as keyof Theme)
