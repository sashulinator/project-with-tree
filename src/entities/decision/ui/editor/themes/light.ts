import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from './css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  decisionEditor_bg: LIGHT.bg.alpha(0.8),
  decisionEditor_panel_bg: LIGHT.bgSecondary.alpha(0.8),
}
