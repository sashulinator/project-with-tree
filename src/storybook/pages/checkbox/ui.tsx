import Flex from '~/abstract/flex/ui/flex'
import Checkbox from '~/ui/checkbox'
import { emptyFn } from '~/utils/function/empty-fn'

export default {
  description: (): JSX.Element | string => 'Описание',

  getName: (): string => Checkbox.displayName,

  getPath: (): string => `/checkbox`,

  controls: [{ name: 'round', input: 'checkbox', defaultValue: true }],

  element: function Element(props): JSX.Element {
    return (
      <Flex dir='column' gap='xl' width='100%'>
        unchecked
        <Checkbox height='s' placeholder='placeholder' {...props} onChange={emptyFn} />
        checked
        <Checkbox checked height='s' placeholder='placeholder' {...props} onChange={emptyFn} />
        disabled
        <Checkbox disabled height='s' placeholder='placeholder' {...props} onChange={emptyFn} />
        checked disabled
        <Checkbox checked disabled height='s' placeholder='placeholder' {...props} onChange={emptyFn} />
      </Flex>
    )
  },
}
