import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import Checkbox from '~/ui/checkbox'
import Labeled from '~/ui/labeled/ui/labeled'
import { emptyFn } from '~/utils/function/empty-fn'

interface State {
  round: boolean
}

export default {
  getName: (): string => Checkbox.displayName,

  getPath: (): string => `/checkbox`,

  getDescription: (): JSX.Element | string => 'Описание',

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Labeled label='unchecked'>
          <Checkbox height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='checked'>
          <Checkbox checked height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='disabled'>
          <Checkbox disabled height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
        <Labeled label='checked disabled'>
          <Checkbox checked disabled height='s' placeholder='placeholder' {...state} onChange={emptyFn} />
        </Labeled>
      </Flex>
    )
  },

  controls: [{ name: 'round', input: 'checkbox', defaultValue: true }],
} satisfies Config<State>
