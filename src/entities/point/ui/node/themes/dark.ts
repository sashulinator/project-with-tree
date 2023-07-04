import { DARK } from '~/shared/theme/dark'

import { PointNodeCSSVars } from '../types/css-vars'
import { common } from './common'

export const dark: PointNodeCSSVars = {
  ...common,
  pointNode_bg: DARK.bg,
}
