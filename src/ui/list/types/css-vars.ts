import { ToStringable } from '~/utils/core'

// eslint-disable-next-line import/no-unused-modules
export interface ListCSSVars {
  /* Sizable properties */
  listItem_fontSize?: ToStringable
  listItem_height?: ToStringable
  listItem_padding?: ToStringable
  listItem_margin?: ToStringable
  listItem_borderRadius?: ToStringable

  // listItem_fontSize__s?: ToStringable
  // listItem_height__s?: ToStringable
  // listItem_lineHeight__s?: ToStringable
  // listItem_horizontalPadding__s?: ToStringable
  // listItem_borderRadius__s?: ToStringable

  // listItem_fontSize__l?: ToStringable
  // listItem_height__l?: ToStringable
  // listItem_lineHeight__l?: ToStringable
  // listItem_horizontalPadding__l?: ToStringable
  // listItem_borderRadius__l?: ToStringable

  /* Statable properties */
  listItem_border?: ToStringable
  listItem_transition?: ToStringable
  listItem_color?: ToStringable
  listItem_outlineWidth?: ToStringable
  listItem_outlineColor?: ToStringable
  listItem_outlineStyle?: ToStringable

  listItem_bg__hovered?: ToStringable
  listItem_border__hovered?: ToStringable
  listItem_transition__hovered?: ToStringable
  listItem_color__hovered?: ToStringable
  listItem_outlineWidth__hovered?: ToStringable

  listItem_bg__selected?: ToStringable
  listItem_border__selected?: ToStringable
  listItem_transition__selected?: ToStringable
  listItem_color__selected?: ToStringable
  listItem_outlineWidth__selected?: ToStringable

  listItem_bg__disabled?: ToStringable
  listItem_borderColor__disabled?: ToStringable
  listItem_transition__disabled?: ToStringable
  listItem_color__disabled?: ToStringable
}
