import { CSSVars as AbstractButtonCssVars } from '~/abstract/button'
import { ToStringable } from '~/utils/core'

export type CSSVars = AbstractButtonCssVars & {
  button_bg__hovered: ToStringable
  button_bg__active: ToStringable
}
