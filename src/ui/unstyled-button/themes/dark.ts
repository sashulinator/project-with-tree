import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const darkTheme: CSSVars = {
  button_outlineColor: DARK.outlineColor,
  ...common,
}
