import { DARK } from '~/shared/theme/dark'

import { CSSVars } from './types'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  decisionEditor_bg: DARK.bg,
  decisionEditor_panel_bg: DARK.bg.darken(0.2).alpha(0.95),
}
