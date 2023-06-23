import ThemeDropdown from '~/ui/theme-dropdown'
import { I18nDropdown } from '~/widgets/i18n'

export default function Login(): JSX.Element {
  return (
    <main>
      <ThemeDropdown />
      <I18nDropdown />
    </main>
  )
}
