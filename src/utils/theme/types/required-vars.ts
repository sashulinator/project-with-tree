import { ToStringable } from '../../core'

export type RequiredVars = {
  /* main background */
  bg: ToStringable

  /* content background */
  bgSecondary: ToStringable

  /* default color */
  color: ToStringable

  /* primary color */
  primary: ToStringable

  /* caret color */
  caretColor: ToStringable

  /* selection color */
  selectionColor: ToStringable

  /* selection background */
  selectionBg: ToStringable

  /* color on focus active */
  outlineColor: ToStringable

  /* primary color */
  borderColor: ToStringable

  /* box-shadow */
  boxShadow: ToStringable

  /* error color */
  errorColor: ToStringable

  /* focus color (usually the same as primary) */
  focus: ToStringable

  /* If entire component has the same color as `focus` */
  focusAlt: ToStringable
}
