import { Config, Props } from '~/storybook/types'
import Field from '~/ui/field'
import { H1 } from '~/ui/heading'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
  height: 's' | 'm' | 'l'
}

export default {
  getName: (): string => Field.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Field.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return <Field {...state} style={{ maxWidth: '15rem' }} />
  },

  controls: [
    { name: 'isFocused', input: 'checkbox', defaultValue: false },
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
