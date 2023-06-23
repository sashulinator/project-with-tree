import I18nDropdown from '~/ui/language-dropdown'
import ThemeDropdown from '~/ui/theme-dropdown'

export default function Login(): JSX.Element {
  return (
    <main>
      <ThemeDropdown />
      <I18nDropdown />
    </main>
  )
}
