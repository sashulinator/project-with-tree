import Flex from '~/abstract/flex/ui/flex'
import { Joint } from '~/entities/decision/ui/editor/widgets/canvas/widgets/node'
import { Config, Props } from '~/storybook/types'
import Checkbox from '~/ui/checkbox'
import { H1 } from '~/ui/heading'
import Labeled from '~/ui/labeled/ui/labeled'
import { emptyFn } from '~/utils/function/empty-fn'

interface State {
  round: boolean
}

export default {
  getName: (): string => Checkbox.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Checkbox.displayName}</H1>
        Добавьте описание
      </>
    )
  },

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
