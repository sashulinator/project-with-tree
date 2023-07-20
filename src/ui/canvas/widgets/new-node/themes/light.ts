import { LIGHT } from '~/shared/theme/light'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  node_bg: LIGHT.bg,
}
