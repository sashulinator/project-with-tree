import { ToStringable } from '../../../utils/core'

export interface Theme {
  bg: ToStringable
  bgSecondary: ToStringable
  color: ToStringable
  primary: ToStringable
  primaryAlpha04: ToStringable
  caretColor: ToStringable
  selectionColor: ToStringable
  selectionBg: ToStringable

  /* Misc */
  input_borderColor: ToStringable
  errorColor: ToStringable
}
