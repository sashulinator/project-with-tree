import { LIGHT } from '~/shared/theme/light'

import { CSSVars } from '../types/_css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  link_color: LIGHT.primary,
}
