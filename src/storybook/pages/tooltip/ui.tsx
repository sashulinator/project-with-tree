import Flex from '~/abstract/flex/ui/flex'
import Tooltip from '~/ui/tooltip'

export default {
  description: (): JSX.Element | string => 'Описание',

  getName: (): string => Tooltip.displayName,

  getPath: (): string => `/tooltip`,

  controls: [
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tc',
      style: { width: '200px' },
    },
    {
      name: 'delay',
      input: 'input',
      defaultValue: 300,
      width: '200px',
      type: 'number',
    },
  ],

  element: function Element(props): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Tooltip content={'World'} placeholder='placeholder' {...props}>
          <button>Hello</button>
        </Tooltip>
      </Flex>
    )
  },
}
