import { COMMON } from '~/shared/theme/common'

import { CSSVars } from '../types/css-vars'

export const common = {
  // height
  button_height__m: COMMON.input_height,
  button_height__l: COMMON.input_height__l,
  button_height__s: COMMON.input_height__s,
  // outline
  button_outlineWidth: COMMON.outlineWidth,
} satisfies Partial<CSSVars>
