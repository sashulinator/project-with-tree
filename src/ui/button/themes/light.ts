import clr from 'color'

import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const light: CSSVars = {
  ...common,
  button_outlineColor: LIGHT.outlineColor,
  button_bg__hovered: clr('black').alpha(0.06),
  button_bg__active: clr('black').alpha(0.09),
}
