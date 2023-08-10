import { DARK } from '~/shared/theme'

import { Theme } from '..'

export const dark = {
  decisionEditor_bg: DARK.bg,
  decisionEditor_panel_bg: DARK.bg.darken(0.2).alpha(0.95),
} satisfies Theme
