import clr from 'color'

import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const dark: CSSVars = {
  ...common,
  button_outlineColor: DARK.outlineColor,
  button_bg__hovered: clr('white').alpha(0.07),
  button_bg__active: clr('white').alpha(0.11),
}
