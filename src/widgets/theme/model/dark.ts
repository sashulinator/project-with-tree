import clr from 'color'

import { DecisionPointCSSVars } from '~/entities/point'
import { NodeRuleSetCSSVars } from '~/entities/point/widgets/node/ui/rule-set/types/css-vars'
import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { darkTheme as textInput } from '~/ui/text-input/themes/dark'

import { Theme } from '../types/theme'
import { commonTheme } from './common'

/* Main */
const primary = clr('#027ffe')

const outlineColor = primary.alpha(0.5)
const color = clr('#b2bac2')
const bg = clr('#0a1929')
const bgSecondary = clr('#011e3c')
const caretColor = clr('yellow')
const selectionColor = color
const selectionBg = clr('yellow')

/* Misc */
const input_borderColor = clr('#265d97')
const errorColor = clr('#d2302f')

// Button
const button_outlineColor = outlineColor

/* DecisionPoint */
const decisionPoint_bg = bg

/* NodeRuleSet */
const nodeRuleSet_bg = bg.lighten(0.3)
const nodeRuleSet_bg__hovered = primary
const nodeRuleSet_bg__editing = primary

export const dark: Theme & ButtonCSSVars & DecisionPointCSSVars & NodeRuleSetCSSVars = {
  ...commonTheme,
  primary,

  color,
  bg,
  bgSecondary,
  caretColor,
  selectionColor,
  selectionBg,

  outlineColor,
  errorColor,
  borderColor: input_borderColor,

  // button
  button_outlineColor,

  // DecisionPoint
  decisionPoint_bg,

  /* NodeRule */
  nodeRuleSet_bg,
  nodeRuleSet_bg__hovered,
  nodeRuleSet_bg__editing,

  ...textInput,
}
