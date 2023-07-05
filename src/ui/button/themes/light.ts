import clr from 'color'

import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const light: CSSVars = {
  button_outlineColor: LIGHT.primary.alpha(0.5),
  button_color: clr('#fff'),
  button_bg: LIGHT.primary,
  button_border: LIGHT.primary,
  button_color__outlined: LIGHT.primary,
  button_border__outlined: LIGHT.primary,

  button_color__ghost: LIGHT.color,
  button_bg__ghost__hover: LIGHT.bg.lighten(0.5),
  ...common,
}
