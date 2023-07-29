import clr from 'color'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'
import { lightTheme } from '~/ui/field'

export const light: CSSVars = {
  ...common,
  ghostButton_bg__active: lightTheme.field_bg__focus,
  ghostButton_bg__hovered: lightTheme.field_bg__hover,
}
