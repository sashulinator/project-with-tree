import { darkTheme } from '~/ui/field'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  ordinaryButton_bg: darkTheme.field_bg,
  ordinaryButton_bg__active: darkTheme.field_bg__hover,
  ordinaryButton_bg__hovered: darkTheme.field_bg__hover,
  ordinaryButton_bg_color: 'white',
}
