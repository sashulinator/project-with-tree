import Flex from '~/abstract/flex/ui/flex'

import { H1 } from '~/ui/heading'

import PageSection from '~/ui/page-section'
import Default from './-default'

export default function MentionPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>Mention</H1>
        <p>Компонент Mention</p>
        <br />
      </PageSection>
      <Default />
    </Flex>
  )
}
