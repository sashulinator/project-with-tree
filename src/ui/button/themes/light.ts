import clr from 'color'

import { light } from '~/shared/theme/light'

import { ButtonCSSVars } from '../types/css-vars'
import { common } from './_common'

export const lightTheme: ButtonCSSVars = {
  button_outlineColor: light.primary.alpha(0.5),
  button_color: clr('#fff'),
  button_bg: light.primary,
  button_border: light.primary,
  button_color__outlined: light.primary,
  button_border__outlined: light.primary,
  ...common,
}
