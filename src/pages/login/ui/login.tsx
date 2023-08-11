import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { addToast } from '~/abstract/toast'
import { useT } from '~/lib/i18n/use-t'
import { routes } from '~/shared/routes'
import { PrimaryButton } from '~/ui/button'
import Input, { Password } from '~/ui/input'
import I18nDropdown from '~/ui/language-dropdown'
import ThemeDropdown from '~/ui/theme-dropdown'

import { translations } from '../model/translations'

const USERNAME = 'username'
const PASSWORD = 'password'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const t = useT(translations, 'login')
  const [value, setValue] = useState<string>('')

  return (
    <main className='flex justify-center'>
      <div className='flex justify-center  items-center flex-col'>
        <I18nDropdown />
        <ThemeDropdown />
        <form onSubmit={onSubmit}>
          <div className='w-20rem flex flex-col m-4'>
            <label className='label mb-0.5rem' htmlFor={USERNAME}>
              {t.Username()}
            </label>
            <Input height='l' id={USERNAME} name={USERNAME} autoComplete='off' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <label className='label mb-0.5rem' htmlFor={PASSWORD}>
              {t.Password()}
            </label>
            <Password
              height='l'
              autoComplete='off'
              value={value}
              isError={value.length < 3}
              onChange={({ target }): void => setValue(target.value)}
              id={PASSWORD}
              name={PASSWORD}
            />
          </div>
          <div className='w-20rem flex flex-col m-4 pt-0.1rem'>
            <PrimaryButton height='l'>{t.Login()}</PrimaryButton>
          </div>
        </form>
      </div>
    </main>
  )

  function onSubmit(e: FormEvent): void {
    e.preventDefault()
    navigate(routes.main.path)
    addToast({ data: t.success.loggedIn(), type: 'success' })
  }
}
