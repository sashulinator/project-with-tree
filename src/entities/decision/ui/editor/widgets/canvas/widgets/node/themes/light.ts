import clr from 'color'

import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  canvasNode_bg: clr('white'),
}
