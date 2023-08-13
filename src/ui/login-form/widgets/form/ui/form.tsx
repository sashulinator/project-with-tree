import './form.scss'

import { useEffect, useState } from 'react'

import { PrimaryButton } from '~/ui/button'
import Input, { Password } from '~/ui/input'
import { c } from '~/utils/core'
import { preventDefault } from '~/utils/dom-event'
import { fns } from '~/utils/function'

import { translations } from '..'

Form.displayName = 'ui-LoginForm-w-Form'

const USERNAME = 'username'
const PASSWORD = 'password'

export type SubmitData = { username: string; password: string }

export interface Props {
  className?: string
  localStorageName: string
  translations: Partial<typeof translations>
  usernameHidden: boolean
  selected: string | undefined
  onSubmit: (data: SubmitData) => void
}

export default function Form(props: Props): JSX.Element {
  const t = { ...translations, ...props.translations }

  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    if (props.selected) {
      setUsername(props.selected)
    } else {
      setUsername('')
    }
  }, [props.selected])

  return (
    <form
      onSubmit={fns(preventDefault, () => props.onSubmit({ username, password }))}
      className={c(props.className, Form.displayName)}
    >
      <Input
        placeholder={t.username}
        hidden={props.usernameHidden}
        value={props.selected || username}
        onChange={({ target }): void => setUsername(target.value)}
        height='l'
        id={USERNAME}
        name={USERNAME}
        autoComplete='off'
      />
      <Password
        className={c('field --password')}
        height='l'
        placeholder={t.password}
        autoComplete='off'
        value={password}
        onChange={({ target }): void => setPassword(target.value)}
        id={PASSWORD}
        name={PASSWORD}
      />
      <PrimaryButton height='l' type='submit'>
        {t.login}
      </PrimaryButton>
    </form>
  )
}
