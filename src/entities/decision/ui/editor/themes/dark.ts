import { DARK } from '~/shared/theme/dark'

import { CSSVars } from './types'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  decisionEditor_bg: DARK.bg.alpha(0.8),
  decisionEditor_panel_bg: DARK.bgSecondary.alpha(0.8),
}
