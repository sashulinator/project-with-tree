import Flex from '~/abstract/flex/ui/flex'
import List, { Controller, ItemProps } from '~/abstract/list'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

interface State {}

export default {
  getName: (): string => List.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{List.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      // state
    } = props

    const controller = new Controller(data, (i) => i.id)

    return (
      <Flex dir='column'>
        <Flex>
          <button onClick={(): void => controller.selected.set([data[0].id])}>select first</button>
          <button onClick={(): void => controller.selectNext()}>select next</button>
          <button onClick={(): void => controller.selectPrevious()}>select previous</button>
        </Flex>
        <List
          list={data}
          controller={controller}
          itemProps={{ test: 'hello' }}
          getItemId={(i): Id => i.id}
          renderItem={_Item}
        />
      </Flex>
    )
  },

  controls: [],
} satisfies Config<State>

/**
 * Private
 */
type Item = { id: string }

function _Item(props: ItemProps<Item, { test: string }>): JSX.Element {
  useUpdate(subscribeToUpdates)

  const isSelected = props.controller.selected.value.includes(props.id)

  return <li style={{ background: isSelected ? 'red' : undefined }}>{props.id}</li>

  function subscribeToUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('selected', update))
  }
}

const data: Item[] = [
  { id: 'one' },
  { id: 'two' },
  { id: 'free' },
  { id: 'four' },
  { id: 'five' },
  { id: 'seven' },
  { id: 'eight' },
  { id: 'nine' },
  { id: 'ten' },
]
