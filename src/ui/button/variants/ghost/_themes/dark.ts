import { CSSVars } from '../types/_css-vars'
import { common } from './common'
import { darkTheme } from '~/ui/field'

export const dark: CSSVars = {
  ...common,
  ghostButton_bg__active: darkTheme.field_bg__focus,
  ghostButton_bg__hovered: darkTheme.field_bg__hover,
  ghostButton_color: 'white',
}
