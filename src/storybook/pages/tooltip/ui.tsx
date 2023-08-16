import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import Tooltip, { TooltipProps } from '~/ui/tooltip'

interface State {
  delay: number
  points: TooltipProps['placement']
}

export default {
  getName: (): string => Tooltip.displayName,

  getPath: (): string => `/tooltip`,

  getDescription: (): JSX.Element | string => 'Описание',

  element: function Element(props: Props<State>): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Tooltip content={'World'} {...props}>
          <button>Hello</button>
        </Tooltip>
      </Flex>
    )
  },

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
} satisfies Config<State>
