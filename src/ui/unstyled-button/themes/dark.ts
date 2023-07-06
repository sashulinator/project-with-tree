import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const dark: CSSVars = {
  ...common,
  button_outlineColor: DARK.outlineColor,
}
