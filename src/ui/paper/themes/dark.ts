import { DARK } from '~/shared/theme/dark'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  paper_bg: DARK.bgSecondary,
  borderColor: DARK.bgSecondary.lighten(0.7),
}
