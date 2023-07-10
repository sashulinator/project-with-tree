import { LIGHT } from '~/shared/theme/light'
import { CSSVars } from '../types/css-vars'
import { common } from './common'

export const light: CSSVars = {
  ...common,
  paper_bg: LIGHT.bgSecondary,
  borderColor: LIGHT.bgSecondary.darken(0.25),
}
