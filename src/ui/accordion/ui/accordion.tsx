import './accordion.css'

import AbstractAccordion, { AccordionProps as AbstractAccordionProps } from '~/abstract/accordion'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

Accordion.displayName = 'ui-Accordion'

export interface AccordionProps<HeaderProps> extends AbstractAccordionProps<HeaderProps> {
  variants?: ('bg' | 'bgSecondary' | 'transparent' | 'borderless')[]
  height?: 's' | 'm' | 'l' | null
}

export default function Accordion<HeaderProps>(props: AccordionProps<HeaderProps>): JSX.Element {
  const { variants = ['transparent'], height = 'm', ...accordionProps } = props

  const variantClasses = variants.map((v) => `--${v}`)
  const heightClass = height === null ? null : `--${height}`

  return (
    <AbstractAccordion
      {...accordionProps}
      className={c(props.className, Accordion.displayName, heightClass, ...variantClasses)}
    />
  )
}
