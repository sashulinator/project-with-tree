import Flex from '~/abstract/flex/ui/flex'

import { H1 } from '~/ui/heading'

import PageSection from '~/ui/page-section'
import { AbstractSection } from './-abstract'
import { UISection } from './-ui'
import { ChevronAccordion } from '~/ui/accordion'

export default function AccordionPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>Accordion</H1>
        <p>Описание</p>
        <Flex width='9rem'>
          <ChevronAccordion header='header'>Body content</ChevronAccordion>
        </Flex>
      </PageSection>
      <AbstractSection />
      <UISection />
    </Flex>
  )
}
