import { TextInputCSSVars } from '~/abstract/text-input/types/css-vars'
import { outlineWidth } from '~/shared/theme/common'
import { light } from '~/shared/theme/light'

const textInput_bg = light.bg
const textInput_color = light.color

export const lightTheme: TextInputCSSVars = {
  textInput_color,
  textInput_bg,
  textInput_borderColor: light.borderColor,
  textInput_outlineWidth: outlineWidth,

  // --hovered
  textInput_bg__hovered: textInput_bg.lighten(0.02),
  textInput_borderColor__hovered: light.primary.lighten(0.5),

  // --focused
  textInput_outlineColor__focused: light.outlineColor,
  textInput_borderColor__focused: light.primary,
  // --error
  textInput_bg__error: light.errorColor.lighten(0.9),
  textInput_outlineColor__error: light.errorColor.alpha(0.5),
  textInput_borderColor__error: light.errorColor,
  // --disabled
  textInput_bg__disabled: textInput_bg.lighten(0.01),
  textInput_borderColor__disabled: textInput_bg.lighten(0.01),
  textInput_color__disabled: textInput_color.lighten(0.3),
}
