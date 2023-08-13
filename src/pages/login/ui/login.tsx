import './login.scss'

import { useNavigate } from 'react-router'

import { addToast } from '~/abstract/toast'
import { USER_LIST } from '~/constants/local-storage'
import { useT } from '~/lib/i18n/use-t'
import { routes } from '~/shared/routes'
import I18nDropdown from '~/ui/language-dropdown'
import LoginForm, { FormSubmitData, User } from '~/ui/login-form'
import ThemeDropdown from '~/ui/theme-dropdown'

import { translations } from '../model/translations'

LoginPage.displayName = 'page-Login'

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const t = useT(translations, 'login')

  return (
    <main className='page-Login'>
      <div className='form'>
        <div className='controls'>
          <I18nDropdown />
          <ThemeDropdown />
        </div>
        <LoginForm translations={{}} localStorageName={USER_LIST} onSubmit={onSubmit} />
      </div>
    </main>
  )

  function onSubmit(data: FormSubmitData, onSuccess: (user: User) => void): void {
    console.log(data, onSuccess)

    onSuccess({ name: data.username })
    navigate(routes.main.path)
    addToast({ data: t.success.loggedIn(), type: 'success' })
  }
}
