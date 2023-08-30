import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import { PrimaryButton } from '~/ui/button'
import { H1 } from '~/ui/heading'
import Tooltip, { TooltipProps } from '~/ui/tooltip'

interface State {
  delay: number
  points: TooltipProps['placement']
}

export default {
  getName: (): string => Tooltip.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Tooltip.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props
    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Tooltip contents={'World'} {...state}>
          <PrimaryButton>Hello</PrimaryButton>
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
