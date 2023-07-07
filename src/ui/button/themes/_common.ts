import { commonTheme } from '~/ui/field'
import { CSSVars } from '../types/css-vars'

export const common = {
  // height
  button_height__s: commonTheme.field_height__s,
  button_height__m: commonTheme.field_height__m,
  button_height__l: commonTheme.field_height__l,
  // outline
  button_outlineWidth: commonTheme.field_outlineWidth,
} satisfies Partial<CSSVars>
