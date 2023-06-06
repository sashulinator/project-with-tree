import clr from 'color'

import { Pass, check } from '~/utils/types/test'
import { Theme } from '~/widgets/theme/types/theme'

// 🟢 See index.html
const defaultPrimary = localStorage.getItem('--default-primary')
const defaultColor = localStorage.getItem('--default-color')
const defaultBg = localStorage.getItem('--default-bg')

if (defaultBg === null) {
  throw new Error('LocalStorage must contain "--default-bg" record')
}
if (defaultPrimary === null) {
  throw new Error('LocalStorage must contain "--default-primary" record')
}
if (defaultColor === null) {
  throw new Error('LocalStorage must contain "--default-color" record')
}

const primary = clr(defaultPrimary)
const color = clr(defaultColor)
const bg = clr(defaultBg)
const bgSecondary = clr('white')

export const light = {
  primary,
  color,
  bg,
  bgSecondary,

  caretColor: clr('black'),

  selectionColor: clr('white'),
  selectionBg: primary,

  outlineColor: primary.alpha(0.5),
  borderColor: clr('#cdd2d6'),

  errorColor: clr('#d2302f'),
}

// TODO сделать нормальную проверку
check<keyof Theme, keyof Theme, Pass>({} as keyof typeof light)
check<keyof typeof light, keyof typeof light, Pass>({} as keyof Theme)