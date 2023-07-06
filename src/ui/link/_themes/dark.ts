import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  link_color: DARK.primary,
}
