import { CSSVars } from '../types/css-vars'
import { common } from './common'
import clr from 'color'

export const light: CSSVars = {
  ...common,
  canvasNode_bg: clr('white'),
}
