import { useState } from 'react'
import { Mention } from 'react-mentions'

import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { Input } from '~/ui/mentions'

import { data } from './data'

interface State {
  isFocused: boolean
  isError: boolean
  disabled: boolean
  hidden: boolean
  transparent: boolean
}

export default {
  getName: (): string => 'ui-Mentions',

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

    const [value, setValue] = useState<string>('')

    return (
      <Input {...state} value={value} onChange={(_, v): void => setValue(v)}>
        <Mention trigger='@' data={data} />
      </Input>
    )
  },

  controls: [
    { name: 'isError', input: 'checkbox', defaultValue: false },
    { name: 'hidden', input: 'checkbox', defaultValue: false },
    { name: 'disabled', input: 'checkbox', defaultValue: false },
    { name: 'transparent', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
