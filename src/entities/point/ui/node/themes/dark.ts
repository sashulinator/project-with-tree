import { dark } from '~/shared/theme/dark'

import { PointNodeCSSVars } from '../types/css-vars'
import { common } from './common'

export const darkTheme: PointNodeCSSVars = {
  ...common,
  pointNode_bg: dark.bg,
}
