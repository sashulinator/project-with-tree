import clr from 'color'

import { RequiredVars } from '~/utils/theme/types/required-vars'
import { Pass, check } from '~/utils/types/test'

const primary = clr('#027ffe')
const color = clr('#b2bac2')
const bg = clr('#202124')
const bgSecondary = clr('#303134')

export const DARK = {
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

  focus: primary,
  focusAlt: clr('#7ed321'),
}

// TODO сделать нормальную проверку
check<keyof RequiredVars, keyof RequiredVars, Pass>({} as keyof typeof DARK)
check<keyof typeof DARK, keyof typeof DARK, Pass>({} as keyof RequiredVars)
