import { DARK } from '~/shared/theme/dark'
import { darkTheme as fieldDarkTheme } from '~/ui/field'

import { CSSVars } from './types'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  decision_Editor_w_LeftPanel_w_Node_bg: 'transparent',
  // decision_Editor_w_LeftPanel_w_Node_bg: fieldDarkTheme.field_bg,
  decision_Editor_w_LeftPanel_w_Node_bg__hover: fieldDarkTheme.field_bg__hover,
  decision_Editor_w_LeftPanel_w_Node_color: DARK.color.darken(0.2),
}
