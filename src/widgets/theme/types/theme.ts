import { ToStringable } from '../../../utils/core'

export interface Theme {
  bg: ToStringable
  bgSecondary: ToStringable
  color: ToStringable
  primary: ToStringable
  caretColor: ToStringable
  selectionColor: ToStringable
  selectionBg: ToStringable
  outlineColor: ToStringable

  /* Misc */
  borderColor: ToStringable
  errorColor: ToStringable
}
