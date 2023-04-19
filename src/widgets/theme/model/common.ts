import { ButtonCSSVars } from '~/ui/button/types/css-vars'
import { TextInputCSSVars } from '~/ui/text-input/types/css-vars'

// Input
const input_height = '36px'
const input_height__s = '28px'
const input_height__l = '42px'
const outlineWidth = '4px'

// TextInputCSSVars

export const common: TextInputCSSVars & ButtonCSSVars = {
  textInput_fontSize: '14px',
  textInput_height: input_height,
  textInput_lineHeight: '23px',
  textInput_horizontalPadding: '12px',
  textInput_borderRadius: '8px',
  textInput_borderWidth: '1px',
  textInput_transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
  textInput_outlineWidth: outlineWidth,
  textInput_height__s: input_height__s,
  textInput_height__l: input_height__l,
  // --focused
  textInput_outlineStyle__focused: `solid`,

  // Button
  button_height: input_height,
  button_height__l: input_height__l,
  button_height__s: input_height__s,
  button_outlineWidth: outlineWidth,
  button_transition: 'box-shadow 0.3s',
}
