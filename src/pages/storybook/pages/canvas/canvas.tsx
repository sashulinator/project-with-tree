// import Callout, { top } from '~/ui/callout'

import Flex from '~/abstract/flex/ui/flex'

import { H1 } from '~/ui/heading'

import PageSection from '~/ui/page-section'
import { AbstractItem } from './-abstract-item'
import { UIItem } from './-ui-item'

export default function FieldPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>CANVAS</H1>
        <p>Состоит из виджетов</p>
        <br />
      </PageSection>
      <UIItem />
      <AbstractItem />
    </Flex>
  )
}
