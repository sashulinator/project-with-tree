import Flex from '~/abstract/flex/ui/flex'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled'

export default {
  description: (): JSX.Element | string => 'Описание',

  getName: (): string => Labeled.displayName,

  getPath: (): string => `/labeled`,

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

  element: function Element(props): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Labeled htmlFor='test2' label='Long name' {...props}>
          <Input placeholder='Please enter your long name' />
        </Labeled>
        <Labeled htmlFor='test' label='Test' {...props}>
          <Input placeholder='Test' />
        </Labeled>
      </Flex>
    )
  },
}
