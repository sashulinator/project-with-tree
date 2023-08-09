import { DARK } from '~/shared/theme/dark'
import { darkTheme as fieldDarkTheme } from '~/ui/field'

import { CSSVars } from './types'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  decisionEditorPointPanel_node_bg: 'transparent',
  // decisionEditorPointPanel_node_bg: fieldDarkTheme.field_bg,
  decisionEditorPointPanel_node_bg__hover: fieldDarkTheme.field_bg__hover,
  decisionEditorPointPanel_node_color: DARK.color.darken(0.2),
}
