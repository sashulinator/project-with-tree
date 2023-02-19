import { ToStringable } from '~/utils/core/types/to-stringable'

// eslint-disable-next-line import/no-unused-modules
export interface TextInputCSSVars {
  /* Sizable properties */
  'text-input__font-size'?: ToStringable
  'text-input__height'?: ToStringable
  'text-input__line-height'?: ToStringable
  'text-input__horizontal-padding'?: ToStringable
  'text-input__border-radius'?: ToStringable

  'text-input__font-size--s'?: ToStringable
  'text-input__height--s'?: ToStringable
  'text-input__line-height--s'?: ToStringable
  'text-input__horizontal-padding--s'?: ToStringable
  'text-input__border-radius--s'?: ToStringable

  'text-input__font-size--l'?: ToStringable
  'text-input__height--l'?: ToStringable
  'text-input__line-height--l'?: ToStringable
  'text-input__horizontal-padding--l'?: ToStringable
  'text-input__border-radius--l'?: ToStringable

  /* Statable properties */
  textInput_borderWidth?: ToStringable
  textInput_bg?: ToStringable
  textInput_borderColor?: ToStringable
  textInput_transition?: ToStringable
  textInput_color?: ToStringable
  textInput_outlineWidth?: ToStringable
  textInput_outlineColor?: ToStringable
  textInput_outlineStyle?: ToStringable

  'textInput_bg--hovered'?: ToStringable
  'textInput_borderColor--hovered'?: ToStringable
  'textInput_transition--hovered'?: ToStringable
  'textInput_color--hovered'?: ToStringable
  'textInput_outlineWidth--hovered'?: ToStringable
  'textInput_outlineColor--hovered'?: ToStringable
  'textInput_outlineStyle--hovered'?: ToStringable

  'textInput_borderWidth--focused'?: ToStringable
  'textInput_bg--focused'?: ToStringable
  'textInput_borderColor--focused'?: ToStringable
  'textInput_transition--focused'?: ToStringable
  'textInput_color--focused'?: ToStringable
  'textInput_outlineWidth--focused'?: ToStringable
  'textInput_outlineColor--focused'?: ToStringable
  'textInput_outlineStyle--focused'?: ToStringable

  'textInput_bg--disabled'?: ToStringable
  'textInput_borderColor--disabled'?: ToStringable
  'textInput_transition--disabled'?: ToStringable
  'textInput_color--disabled'?: ToStringable

  'textInput_bg--readonly'?: ToStringable
  'textInput_borderColor--readonly'?: ToStringable
  'textInput_transition--readonly'?: ToStringable
  'textInput_color--readonly'?: ToStringable
  'textInput_outlineColor--readonly'?: ToStringable

  'textInput_bg--error'?: ToStringable
  'textInput_borderColor--error'?: ToStringable
  'textInput_transition--error'?: ToStringable
  'textInput_color--error'?: ToStringable
  'textInput_outlineColor--error'?: ToStringable
}
