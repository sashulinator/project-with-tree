import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from '../types/css-vars'
import { common } from './_common'

export const light: CSSVars = {
  ...common,
  decision_Editor_panel_bg: LIGHT.bg.alpha(0.8),
}
