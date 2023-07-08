import { LIGHT } from '~/shared/theme/light'
import { CSSVars } from '../types/css-vars'
import { common } from './common'
import clr from 'color'

const field_bg = clr('#d0ddeb').alpha(0.4)

export const light: CSSVars = {
  ...common,
  field_outlineColor: LIGHT.outlineColor,
  field_bg,
  // hover
  field_bg__hover: field_bg.alpha(0.5),
  // focus
  field_bg__focus: field_bg.alpha(0),
  field_bg__disabled: field_bg.alpha(0.2),
  // error
  field_bg__error: LIGHT.errorColor.alpha(0.3),
  field_bg__error__hover: LIGHT.errorColor.alpha(0.25),
  field_bg__error__focus: LIGHT.errorColor.alpha(0.35),
}
