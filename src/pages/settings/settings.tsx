import { I18nDropdown } from '~/widgets/i18n'
import { ThemeDropdown } from '~/widgets/theme'

export default function Login(): JSX.Element {
  return (
    <main>
      <ThemeDropdown />
      <I18nDropdown />
    </main>
  )
}
