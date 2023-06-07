import clr from 'color'

import { darkTheme as pointNode } from '~/entities/decision/ui/node/themes/dark'
import { dark } from '~/shared/theme/dark'
import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { darkTheme as textInput } from '~/ui/text-input/themes/dark'

import { Theme } from '../types/theme'
import { commonTheme } from './common'

/* Misc */
const input_borderColor = clr('#265d97')
const errorColor = clr('#d2302f')

// Button
const button_outlineColor = dark.outlineColor

/* DecisionPoint */
const pointNode_bg = dark.bg

export const darkTheme: Theme & ButtonCSSVars = {
  ...commonTheme,
  ...dark,
  errorColor,
  borderColor: input_borderColor,

  // button
  button_outlineColor,

  // DecisionPoint
  pointNode_bg,

  ...textInput,
  ...pointNode,
}
