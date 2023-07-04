import { LIGHT } from '~/shared/theme/light'

import { PointNodeCSSVars } from '../types/css-vars'
import { common } from './common'

export const lightTheme: PointNodeCSSVars = {
  ...common,
  pointNode_bg: LIGHT.bg,
}
