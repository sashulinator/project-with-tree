import clr from 'color'

import { PointNodeCSSVars } from '~/entities/point'
import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { darkTheme as textInput } from '~/ui/text-input/themes/dark'

import { Theme } from '../types/theme'
import { commonTheme } from './common'

/* Main */
const primary = clr('#027ffe')

const outlineColor = primary.alpha(0.5)
const color = clr('#b2bac2')
const bg = clr('#0a1929')
const bgSecondary = clr('#011e3c')
const caretColor = clr('yellow')
const selectionColor = color
const selectionBg = clr('yellow')

/* Misc */
const input_borderColor = clr('#265d97')
const errorColor = clr('#d2302f')

// Button
const button_outlineColor = outlineColor

/* DecisionPoint */
const pointNode_bg = bg

export const dark: Theme & ButtonCSSVars & PointNodeCSSVars = {
  ...commonTheme,
  primary,

  color,
  bg,
  bgSecondary,
  caretColor,
  selectionColor,
  selectionBg,

  outlineColor,
  errorColor,
  borderColor: input_borderColor,

  // button
  button_outlineColor,

  // DecisionPoint
  pointNode_bg,

  ...textInput,
}
