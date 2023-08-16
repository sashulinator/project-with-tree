import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled'

interface State {
  direction: 'horizontal' | 'vertical'
  hidden: boolean
}

export default {
  getDescription: (): JSX.Element | string => 'Описание',

  getName: (): string => Labeled.displayName,

  getPath: (): string => `/labeled`,

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Labeled htmlFor='test2' label='Long name' {...state}>
          <Input placeholder='Please enter your long name' />
        </Labeled>
        <Labeled htmlFor='test' label='Test' {...state}>
          <Input placeholder='Test' />
        </Labeled>
      </Flex>
    )
  },

  controls: [
    {
      name: 'direction',
      input: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'vertical',
      style: { width: '200px' },
    },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
