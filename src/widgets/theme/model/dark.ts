import clr from 'color'

import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { Theme } from '../types/theme'
import { common } from './common'

/* Main */
const primary = clr('#027ffe')
const primaryAlpha04 = primary.alpha(0.4)
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

/* TextInput */
const textInput_color = clr('#b2bac2')
const textInput_bg = clr('#122f4c')
const textInput_borderColor = input_borderColor
const textInput_outlineWidth = '4px'
// --hovered
const textInput_bg__hovered = textInput_bg.lighten(0.05)
const textInput_borderColor__hovered = primary.lighten(0.3)

// --focused
const textInput_borderColor__focused = primary
const textInput_outlineColor__focused = outlineColor

// --error
const textInput_bg__error = errorColor.darken(0.9)
const textInput_outlineColor__error = errorColor.alpha(0.5)
const textInput_borderColor__error = errorColor
// --disabled
const textInput_bg__disabled = textInput_bg.darken(0.5)
const textInput_borderColor__disabled = textInput_bg.darken(0.5)
const textInput_color__disabled = textInput_color.darken(0.4)

// Button
const button_outlineColor = outlineColor

export const dark: Theme & TextInputCSSVars & ButtonCSSVars = {
  ...common,
  primary,
  primaryAlpha04,
  color,
  bg,
  bgSecondary,
  caretColor,
  selectionColor,
  selectionBg,

  errorColor,
  input_borderColor,

  // TextInputCSSVars
  textInput_color,
  textInput_bg,
  textInput_borderColor,
  textInput_outlineWidth,
  textInput_bg__hovered,
  textInput_borderColor__hovered,
  textInput_borderColor__focused,
  textInput_outlineColor__focused,
  textInput_bg__error,
  textInput_outlineColor__error,
  textInput_borderColor__error,
  textInput_bg__disabled,
  textInput_borderColor__disabled,
  textInput_color__disabled,
  // button
  button_outlineColor,
}
