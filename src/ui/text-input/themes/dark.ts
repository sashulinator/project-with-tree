import { TextInputCSSVars } from '~/abstract/text-input/types/css-vars'
import { dark } from '~/shared/theme/dark'

import { common } from './_common'

const textInput_bg = dark.bg
const textInput_color = dark.color

export const darkTheme: TextInputCSSVars = {
  textInput_color,
  textInput_bg,
  textInput_borderColor: dark.borderColor,

  // --hovered
  textInput_bg__hovered: textInput_bg.lighten(0.05),

  // --focused
  textInput_outlineColor__focused: dark.outlineColor,

  // --error
  textInput_bg__error: dark.errorColor.darken(0.9),
  textInput_outlineColor__error: dark.errorColor.alpha(0.5),
  textInput_borderColor__error: dark.errorColor,

  // --disabled
  textInput_bg__disabled: textInput_bg.darken(0.5),
  textInput_borderColor__disabled: textInput_bg.darken(0.5),
  textInput_color__disabled: textInput_color.darken(0.4),
  ...common,
}
