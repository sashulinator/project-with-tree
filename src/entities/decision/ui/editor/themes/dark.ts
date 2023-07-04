import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const dark: CSSVars = {
  ...common,
  decision_Editor_panel_bg: DARK.bg.alpha(0.8),
}
