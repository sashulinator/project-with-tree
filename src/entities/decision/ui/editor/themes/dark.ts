import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const dark: CSSVars = {
  ...common,
  decisionEditor_bg: DARK.bg.alpha(0.8),
  decisionEditor_panel_bg: DARK.bgSecondary.alpha(0.8),
}
