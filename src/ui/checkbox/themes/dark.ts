import { DARK } from '~/shared/theme/dark'
import { CSSVars } from '../types/css-vars'
import { common } from './common'
import { darkTheme } from '~/ui/field'

export const dark: CSSVars = {
  ...common,
  checkbox_bg: darkTheme.field_bg,
  checkbox_bg__focus: DARK.focusAlt,
  checkbox_bg__hover: darkTheme.field_bg__hover,
  checkbox_bg__disabled: darkTheme.field_bg__disabled,
  checkbox_bg__error: darkTheme.field_bg__error,
  checkbox_bg__checked: DARK.primary,
  checkbox_color: '#fff',
}
