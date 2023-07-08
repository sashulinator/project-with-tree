import { TextInputCSSVars } from '~/abstract/old-text-input/types/css-vars'
import { DARK } from '~/shared/theme/dark'

import { common } from './_common'

const textInput_bg = DARK.bg
const textInput_color = DARK.color

export const dark: TextInputCSSVars = {
  textInput_color,
  textInput_bg,
  textInput_borderColor: DARK.borderColor,

  // --hovered
  textInput_bg__hovered: textInput_bg.lighten(0.05),

  // --focused
  textInput_outlineColor__focused: DARK.outlineColor,

  // --error
  textInput_bg__error: DARK.errorColor.darken(0.9),
  textInput_outlineColor__error: DARK.errorColor.alpha(0.5),
  textInput_borderColor__error: DARK.errorColor,

  // --disabled
  textInput_bg__disabled: textInput_bg.darken(0.5),
  textInput_borderColor__disabled: textInput_bg.darken(0.5),
  textInput_color__disabled: textInput_color.darken(0.4),
  ...common,
}
