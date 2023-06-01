import clr from 'color'

import { DecisionPointCSSVars } from '~/entities/point'
import { NodeRuleSetCSSVars } from '~/entities/point/widgets/node/ui/rule-set/types/css-vars'
import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { ListCSSVars } from '~/ui/list/types/css-vars'
import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

import { Theme } from '../types/theme'
import { common } from './common'

// 🟢 See index.html
const defaultPrimary = localStorage.getItem('--default-primary')
const defaultColor = localStorage.getItem('--default-color')
const defaultBg = localStorage.getItem('--default-bg')

if (defaultBg === null) {
  throw new Error('LocalStorage must contain "--default-bg" record')
}
if (defaultPrimary === null) {
  throw new Error('LocalStorage must contain "--default-primary" record')
}
if (defaultColor === null) {
  throw new Error('LocalStorage must contain "--default-color" record')
}

/* Main */
const primary = clr(defaultPrimary)
const primaryAlpha04 = primary.alpha(0.1)
const color = clr(defaultColor)
const bg = clr(defaultBg)
const bgSecondary = clr('white')
const caretColor = clr('black')
const selectionColor = clr('white')
const selectionBg = primary
/* Misc */
const input_borderColor = clr('#cdd2d6')
const errorColor = clr('#d2302f')

/* TextInput */
const textInput_color = clr('#2d3843')
const textInput_bg = clr('#f4f6f9')
const textInput_borderColor = input_borderColor
const textInput_outlineColor = primary
// --hovered
const textInput_bg__hovered = textInput_bg.lighten(0.01)
const textInput_borderColor__hovered = primary.lighten(0.5)
// --focused
const textInput_borderColor__focused = defaultPrimary
const textInput_outlineColor__focused = primary.alpha(0.5)
// --error
const textInput_bg__error = errorColor.lighten(0.9)
const textInput_borderColor__error = errorColor
const textInput_outlineColor__error = errorColor.alpha(0.5)
// --disabled
const textInput_bg__disabled = textInput_bg.lighten(0.01)
const textInput_borderColor__disabled = textInput_bg.lighten(0.01)
const textInput_color__disabled = textInput_color.lighten(1.5)

/* List */
const listItem_bg__hovered = bg
const listItem_bg__selected = bg.darken(0.05)

/* Button */
const button_outlineColor = primary.alpha(0.5)
const button_color = clr('#fff')
const button_bg = primary
const button_border = primary
const button_color__outlined = primary
const button_border__outlined = primary

/* DecisionPoint */
const decisionPoint_bg = bgSecondary

/* NodeRuleSet */
const nodeRuleSet_bg = bg.darken(0.3)
const nodeRuleSet_bg__hovered = primary
const nodeRuleSet_bg__editing = primary

export const light: Theme & TextInputCSSVars & ListCSSVars & ButtonCSSVars & DecisionPointCSSVars & NodeRuleSetCSSVars =
  {
    ...common,
    primary,
    primaryAlpha04,
    color,
    bg,
    bgSecondary,
    caretColor,
    selectionColor,
    selectionBg,

    errorColor,
    input_borderColor,

    // TextInput
    textInput_color,
    textInput_bg,
    textInput_borderColor,
    textInput_outlineColor,
    textInput_outlineColor__focused,
    textInput_bg__hovered,
    textInput_borderColor__hovered,
    textInput_borderColor__focused,
    textInput_bg__error,
    textInput_outlineColor__error,
    textInput_borderColor__error,
    textInput_bg__disabled,
    textInput_borderColor__disabled,
    textInput_color__disabled,

    // List
    listItem_bg__hovered,
    listItem_bg__selected,

    // Button
    button_outlineColor,
    button_color,
    button_bg,
    button_border,
    button_color__outlined,
    button_border__outlined,

    // DecisionPoint
    decisionPoint_bg,

    /* NodeRule */
    nodeRuleSet_bg,
    nodeRuleSet_bg__hovered,
    nodeRuleSet_bg__editing,
  }
