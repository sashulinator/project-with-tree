import { TextInputCSSVars } from '~/abstract/old-text-input/types/css-vars'
import { LIGHT } from '~/shared/theme/light'

import { common } from './_common'

const textInput_bg = LIGHT.bg
const textInput_color = LIGHT.color

export const light: TextInputCSSVars = {
  textInput_color,
  textInput_bg,
  textInput_borderColor: LIGHT.borderColor,

  // --hovered
  textInput_bg__hovered: textInput_bg.lighten(0.02),
  textInput_borderColor__hovered: LIGHT.primary.lighten(0.5),

  // --focused
  textInput_outlineColor__focused: LIGHT.outlineColor,
  textInput_borderColor__focused: LIGHT.primary,

  // --error
  textInput_bg__error: LIGHT.errorColor.lighten(0.9),
  textInput_outlineColor__error: LIGHT.errorColor.alpha(0.5),
  textInput_borderColor__error: LIGHT.errorColor,

  // --disabled
  textInput_bg__disabled: textInput_bg.lighten(0.01),
  textInput_borderColor__disabled: textInput_bg.lighten(0.01),
  textInput_color__disabled: textInput_color.lighten(0.3),
  ...common,
}
