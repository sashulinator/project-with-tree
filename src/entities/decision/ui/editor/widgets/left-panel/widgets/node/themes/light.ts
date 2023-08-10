import { CSSVars } from './types'
import { common } from './common'
import { lightTheme as fieldLightTheme } from '~/ui/field'
import { LIGHT } from '~/shared/theme/light'

export const light: CSSVars = {
  ...common,
  // decision_Editor_w_LeftPanel_w_Node_bg: fieldLightTheme.field_bg,
  decision_Editor_w_LeftPanel_w_Node_bg: 'transparent',
  decision_Editor_w_LeftPanel_w_Node_bg__hover: fieldLightTheme.field_bg__hover,
  decision_Editor_w_LeftPanel_w_Node_color: LIGHT.color.lighten(0.9),
}
