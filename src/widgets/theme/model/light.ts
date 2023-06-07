import clr from 'color'

import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { ListCSSVars } from '~/ui/list/types/css-vars'
import { lightTheme as textInput } from '~/ui/text-input/themes/light'

import { Theme } from '../types/theme'
import { commonTheme } from './common'

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

/* Main */
const primary = clr(defaultPrimary)

const color = clr(defaultColor)
const bg = clr(defaultBg)
const bgSecondary = clr('white')
const caretColor = clr('black')
const selectionColor = clr('white')
const selectionBg = primary
/* Misc */
const input_borderColor = clr('#cdd2d6')
const errorColor = clr('#d2302f')

/* List */
const listItem_bg__hovered = bg
const listItem_bg__selected = bg.darken(0.05)

/* Button */
const button_outlineColor = primary.alpha(0.5)
const button_color = clr('#fff')
const button_bg = primary
const button_border = primary
const button_color__outlined = primary
const button_border__outlined = primary

export const light: Theme & ListCSSVars & ButtonCSSVars = {
  ...commonTheme,
  primary,
  color,
  bg,
  bgSecondary,
  caretColor,
  selectionColor,
  selectionBg,

  outlineColor: primary,
  errorColor,
  borderColor: input_borderColor,

  // List
  listItem_bg__hovered,
  listItem_bg__selected,

  // Button
  button_outlineColor,
  button_color,
  button_bg,
  button_border,
  button_color__outlined,
  button_border__outlined,

  ...textInput,
}
