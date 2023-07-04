import { LIGHT } from '~/shared/theme/light'

import { PointNodeCSSVars } from '../types/css-vars'
import { common } from './common'

export const light: PointNodeCSSVars = {
  ...common,
  pointNode_bg: LIGHT.bg,
}
