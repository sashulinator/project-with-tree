import { ToStringable } from '~/utils/core/types/to-stringable'

// eslint-disable-next-line import/no-unused-modules
export interface TextInputCSSVars {
  /* Sizable properties */
  'text-input__font-size': ToStringable
  'text-input__height': ToStringable
  'text-input__line-height': ToStringable
  'text-input__horizontal-padding': ToStringable
  'text-input__border-radius': ToStringable

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
  'text-input__border-width': ToStringable
  'text-input__bg': ToStringable
  'text-input__border-color': ToStringable
  'text-input__transition': ToStringable
  'text-input__color': ToStringable
  'text-input__outline-width'?: ToStringable
  'text-input__outline-color'?: ToStringable
  'text-input__outline-style'?: ToStringable

  'text-input__bg--hovered'?: ToStringable
  'text-input__border-color--hovered'?: ToStringable
  'text-input__transition--hovered'?: ToStringable
  'text-input__color--hovered'?: ToStringable
  'text-input__outline-width--hovered'?: ToStringable
  'text-input__outline-color--hovered'?: ToStringable
  'text-input__outline-style--hovered'?: ToStringable

  'text-input__border-width--focused'?: ToStringable
  'text-input__bg--focused'?: ToStringable
  'text-input__border-color--focused'?: ToStringable
  'text-input__transition--focused'?: ToStringable
  'text-input__color--focused'?: ToStringable
  'text-input__outline-width--focused'?: ToStringable
  'text-input__outline-color--focused'?: ToStringable
  'text-input__outline-style--focused'?: ToStringable

  'text-input__bg--disabled'?: ToStringable
  'text-input__border-color--disabled'?: ToStringable
  'text-input__transition--disabled'?: ToStringable
  'text-input__color--disabled'?: ToStringable

  'text-input__bg--readonly'?: ToStringable
  'text-input__border-color--readonly'?: ToStringable
  'text-input__transition--readonly'?: ToStringable
  'text-input__color--readonly'?: ToStringable

  'text-input__bg--error'?: ToStringable
  'text-input__border-color--error'?: ToStringable
  'text-input__transition--error'?: ToStringable
  'text-input__color--error'?: ToStringable
  'text-input__outline-color--error'?: ToStringable
}
