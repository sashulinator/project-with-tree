import { DARK } from '~/shared/theme/dark'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  canvasNode_bg: DARK.primary.darken(0.5),
}
