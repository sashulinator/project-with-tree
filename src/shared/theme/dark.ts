import clr from 'color'

import { RequiredVars } from '~/utils/theme'

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
  boxShadow: '0px 0px 8px 0px rgba(255, 255, 255, 0.1)',
  focus: primary,
  focusAlt: clr('violet'),
} satisfies RequiredVars
