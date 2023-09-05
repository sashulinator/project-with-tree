import { lightTheme } from '~/ui/field'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  ordinaryButton_bg: lightTheme.field_bg,
  ordinaryButton_bg__active: lightTheme.field_bg__focus,
  ordinaryButton_bg__hovered: lightTheme.field_bg__hover,
  ordinaryButton_bg_color: 'black',
}
