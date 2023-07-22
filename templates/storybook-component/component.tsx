import Flex from '~/abstract/flex/ui/flex'

import { H1 } from '~/ui/heading'

import PageSection from '~/ui/page-section'
import { MainSection } from './-main'

export default function ComponentPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>ComponentName</H1>
        <p>Описание</p>
      </PageSection>
      <MainSection />
    </Flex>
  )
}
