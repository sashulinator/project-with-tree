import clr from 'color'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const dark: CSSVars = {
  ...common,
  ghostButton_bg__active: clr('black').alpha(0.12),
  ghostButton_bg__hovered: clr('white').alpha(0.07),
  ghostButton_color: 'white',
}
