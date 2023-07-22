import Flex from '~/abstract/flex/ui/flex'

import { H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import Paragraph from '~/ui/paragraph'
import { Ol } from '~/ui/list/variants/ol'

export function MainSection(): JSX.Element {
  return (
    <PageSection>
      <Section
        header={
          <>
            <H2>Component.displayName</H2>
            <Paragraph>Описание</Paragraph>
            Фичи:
            <Ol>
              <li>Фича1</li>
            </Ol>
            Наследует OtherComponent.displayName:
            <Ol>
              <li>Наследство1</li>
            </Ol>
          </>
        }
        toolbar={
          <Flex mainAxis='center' gap='l'>
            Toolbar
          </Flex>
        }
      >
        Component
      </Section>
    </PageSection>
  )
}
