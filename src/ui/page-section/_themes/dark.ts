import { DARK } from '~/shared/theme/dark'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const dark: CSSVars = {
  pageSection_bg: DARK.bgSecondary,
  ...common,
}
