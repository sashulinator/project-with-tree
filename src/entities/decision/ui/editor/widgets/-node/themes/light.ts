import { LIGHT } from '~/shared/theme/light'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  canvasNode_bg: LIGHT.primary.alpha(0.1),
}
