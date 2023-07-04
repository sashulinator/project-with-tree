import clr from 'color'

import { LIGHT } from '~/shared/theme/light'

import { ButtonCSSVars } from '../types/css-vars'
import { common } from './_common'

export const lightTheme: ButtonCSSVars = {
  button_outlineColor: LIGHT.primary.alpha(0.5),
  button_color: clr('#fff'),
  button_bg: LIGHT.primary,
  button_border: LIGHT.primary,
  button_color__outlined: LIGHT.primary,
  button_border__outlined: LIGHT.primary,
  ...common,
}
