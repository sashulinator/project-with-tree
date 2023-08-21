import Flex from '~/abstract/flex/ui/flex'
import { Config } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import Labeled from '~/ui/labeled'
import OrderedList from '~/ui/ordered-list'

export default {
  getName: (): string => OrderedList.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Labeled.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <OrderedList items={['hello', 'world', 'lorum', 'ipsum', 'sec', 'oppa', 'salam', 'popa']} />
      </Flex>
    )
  },

  controls: [],
} satisfies Config<unknown>
