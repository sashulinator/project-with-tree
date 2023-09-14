import clr from 'color'

import { LIGHT } from '~/shared/theme'

import { Theme } from '..'

// prettier-ignore
export const light = {
  'decision-Editor_bg':                                   LIGHT.bg.darken(0.01),
  'decision-Editor-panel_bg':                             LIGHT.bgSecondary.alpha(0.95),
  'decision-Editor-joint_color__unlinked':                LIGHT.errorColor,
  'decision-Editor-joint_color__linked':                  clr('rgb(83, 160, 255)'),
  'decision-Editor-joint_color__new':                     clr('rgb(84, 222, 104)'),
} satisfies Theme
