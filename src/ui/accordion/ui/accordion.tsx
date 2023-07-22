import AbstractAccordion, { AccordionProps } from '~/abstract/accordion'
import { c } from '~/utils/core'

Accordion.displayName = 'ui-Accordion'

export type { AccordionProps }

export default function Accordion<HeaderProps>(props: AccordionProps<HeaderProps>): JSX.Element {
  return <AbstractAccordion {...props} className={c(Accordion.displayName, props.className)} />
}
