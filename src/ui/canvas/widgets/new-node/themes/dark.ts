import { DARK } from '~/shared/theme/dark'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  node_bg: DARK.bg,
}
