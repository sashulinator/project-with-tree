import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import Input from '~/ui/input'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  height: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Input.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Input.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return <Input {...state} style={{ maxWidth: '15rem' }} />
  },

  controls: [
    { name: 'isError', input: 'checkbox', defaultValue: false },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'transparent', input: 'checkbox', defaultValue: false },
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 's',
      style: { width: '200px' },
    },
  ],
} satisfies Config<State>

/**
 * Private
 */
