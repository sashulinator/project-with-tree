import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import Paginator from '~/ui/paginator'

interface State {
  page: number
}

export default {
  getName: (): string => Paginator.displayName,

  getPath: (): string => `/paginator`,

  getDescription: (): JSX.Element | string => 'Описание',

  element: function Element(props: Props<State>): JSX.Element {
    const { state, setState } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Paginator size={10} total={3000} onChange={(page): void => setState((s) => ({ ...s, page }))} {...state} />
      </Flex>
    )
  },

  controls: [
    {
      name: 'page',
      input: 'input',
      defaultValue: 1,
      width: '200px',
      type: 'number',
    },
  ],
} satisfies Config<State>
