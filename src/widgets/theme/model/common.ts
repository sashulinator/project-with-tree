import { input_height, input_height__l, input_height__s, outlineWidth } from '~/shared/theme/common'
import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { common as textInput } from '~/ui/text-input/themes/common'

// TextInputCSSVars

export const commonTheme: ButtonCSSVars = {
  // Button
  button_height: input_height,
  button_height__l: input_height__l,
  button_height__s: input_height__s,
  button_outlineWidth: outlineWidth,
  button_transition: 'box-shadow 0.3s',
  ...textInput,
}
