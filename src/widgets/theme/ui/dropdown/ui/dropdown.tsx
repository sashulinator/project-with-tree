import { getCurrentThemeName } from '../../../lib/get-current-theme-name'
import { getThemeNames } from '../../../lib/get-theme-names'
import { setTheme } from '../../../lib/set-theme'
import { ChangeEvent } from 'react'

export default function ThemeDropdown(): JSX.Element {
  const options = getThemeNames()

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrentThemeName()}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    setTheme(e.target.value)
  }
}

ThemeDropdown.dispayName = 'ThemeDropdown'
