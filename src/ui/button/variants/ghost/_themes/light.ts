import clr from 'color'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  ghostButton_bg__active: clr('black').alpha(0.08),
  ghostButton_bg__hovered: clr('black').alpha(0.05),
}
