import clr from 'color'

import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  primaryButton_bg: LIGHT.primary,
  primaryButton_bg__active: LIGHT.primary.darken(0.1),
  primaryButton_bg__hovered: LIGHT.primary.lighten(0.1),
  primaryButton_color: clr('white'),
}
