// import Callout, { top } from '~/ui/callout'

import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'
import List, { ItemProps } from '~/abstract/list/ui/list'
import Button from '~/ui/button'
import { useUpdate } from '~/utils/hooks'

const items = ['hello', 'world', 'again']

export default function ListPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>LIST</H1>
        <p>Компонент List</p>
        <p>Представляет собой div с состояниями readonly, disabled, error, focused</p>
        <br />
      </PageSection>
      <PageSection>
        <ListSection />
      </PageSection>
    </Flex>
  )
}

function ListSection(): JSX.Element {
  return (
    <Section
      header={
        <>
          <H2>Все состояния</H2>
          <p>Расширяет AbstaractField.</p>
        </>
      }
    >
      <List items={items} getItemId={(w): string => w} renderItem={Item} />
    </Section>
  )
}

function Item(props: ItemProps<string>): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const isSelected = props.state.selected.value.includes(props.id)

  return (
    <li style={{ background: isSelected ? 'red' : undefined }}>
      <Button onClick={(): unknown => (props.state.selected.value = [props.id])}>{props.item}</Button>
    </li>
  )

  function subscribeOnUpdates(update: () => void): void {
    props.state.on('selected', update)
  }
}
