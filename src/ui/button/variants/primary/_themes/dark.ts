import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  primaryButton_bg: DARK.primary,
  primaryButton_bg__active: DARK.primary.darken(0.1),
  primaryButton_bg__hovered: DARK.primary.lighten(0.1),
  primaryButton_color: 'white',
}
