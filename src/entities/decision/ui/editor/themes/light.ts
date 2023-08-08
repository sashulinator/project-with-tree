import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from './types'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  decisionEditor_bg: LIGHT.bg.darken(0.01),
  decisionEditor_panel_bg: LIGHT.bgSecondary.alpha(0.8),
}
