import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

const button_outlineColor = DARK.outlineColor

export const dark: CSSVars = {
  button_outlineColor,
  button_bg: DARK.primary,
  button_border: DARK.primary,

  button_color__ghost: DARK.color,
  button_bg__ghost__hover: DARK.bg.lighten(0.5),
  ...common,
}
