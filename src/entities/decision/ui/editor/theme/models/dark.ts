import clr from 'color'

import { DARK } from '~/shared/theme'

import { Theme } from '..'

// prettier-ignore
export const dark = {
  'decision-Editor_bg':                                       DARK.bg,
  'decision-Editor-panel_bg':                                 DARK.bg.darken(0.2).alpha(0.95),
  'decision-Editor-joint_color__unlinked':     DARK.errorColor,
  'decision-Editor-joint_color__linked':       clr('rgb(83, 160, 255)'),
  'decision-Editor-joint_color__new':          clr('rgb(84, 222, 104)'),
} satisfies Theme
