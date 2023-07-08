import { ToStringable } from '~/utils/core'

export type CSSVars = {
  // main
  field_outlineColor: ToStringable
  field_outlineWidth: ToStringable
  field_borderRadius: ToStringable
  field_height__s: ToStringable
  field_height__m: ToStringable
  field_height__l: ToStringable
  // default
  field_bg: ToStringable
  // hover
  field_bg__hover: ToStringable
  // focus
  field_bg__focus: ToStringable
  // error
  field_bg__error: ToStringable
  field_bg__error__hover: ToStringable
  field_bg__error__focus: ToStringable
  // disabled
  field_bg__disabled: ToStringable
}
