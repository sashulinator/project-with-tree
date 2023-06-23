import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { addToast } from '~/abstract/toast'
import { useT } from '~/lib/i18n/use-t'
import Button from '~/ui/button'
import CloseIcon from '~/ui/icons/close'
import EyeOffIcon from '~/ui/icons/eye-off'
import EyeOnIcon from '~/ui/icons/eye-on'
import I18nDropdown from '~/ui/language-dropdown'
import TextInput from '~/ui/text-input'
import ThemeDropdown from '~/ui/theme-dropdown'
import { useBoolean } from '~/utils/hooks/boolean'

import { translations } from '../model/translations'

const USERNAME = 'username'
const PASSWORD = 'password'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const t = useT(translations, 'login')
  const [value, setValue] = useState<string>('')
  const [isPasswordVisible, setPasswordVisible, unsetPasswordVisible] = useBoolean(false)
  const EyeIcon = isPasswordVisible ? EyeOffIcon : EyeOnIcon
  const onEyeClick = isPasswordVisible ? unsetPasswordVisible : setPasswordVisible

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
            <TextInput height='l' id={USERNAME} name={USERNAME} autoComplete='off' />
          </div>
          <div className='w-20rem flex flex-col m-4'>
            <label className='label mb-0.5rem' htmlFor={PASSWORD}>
              {t.Password()}
            </label>
            <TextInput
              height='l'
              autoComplete='off'
              value={value}
              isError={value.length < 3}
              onChange={({ target }): void => setValue(target.value)}
              id={PASSWORD}
              name={PASSWORD}
              type={isPasswordVisible ? 'text' : 'password'}
              right={
                <label htmlFor={PASSWORD} className='flex direction-row'>
                  {[
                    value && <CloseIcon key='1' className='mr-0.7rem' onClick={(): void => setValue('')} />,
                    <EyeIcon key='2' className='mr-0.7rem' onClick={onEyeClick} />,
                  ]}
                </label>
              }
            />
          </div>
          <div className='w-20rem flex flex-col m-4 pt-0.1rem'>
            <Button height='l'>{t.Login()}</Button>
          </div>
        </form>
      </div>
    </main>
  )

  function onSubmit(e: FormEvent): void {
    e.preventDefault()
    navigate('/main')
    addToast({ data: t.success.loggedIn(), type: 'success' })
  }
}
