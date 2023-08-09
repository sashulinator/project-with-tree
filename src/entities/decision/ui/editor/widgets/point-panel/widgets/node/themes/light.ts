import { CSSVars } from './types'
import { common } from './common'
import { lightTheme as fieldLightTheme } from '~/ui/field'
import { LIGHT } from '~/shared/theme/light'

export const light: CSSVars = {
  ...common,
  // decisionEditorPointPanel_node_bg: fieldLightTheme.field_bg,
  decisionEditorPointPanel_node_bg: 'transparent',
  decisionEditorPointPanel_node_bg__hover: fieldLightTheme.field_bg__hover,
  decisionEditorPointPanel_node_color: LIGHT.color.lighten(0.9),
}
