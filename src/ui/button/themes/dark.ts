import { DARK } from '~/shared/theme/dark'

import { ButtonCSSVars } from '../types/css-vars'
import { common } from './_common'

const button_outlineColor = DARK.outlineColor

export const darkTheme: ButtonCSSVars = {
  button_outlineColor,
  ...common,
}
