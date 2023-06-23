import { ChangeEvent } from 'react'

import { changeLanguage } from '~/lib/i18n/change-language'
import { getCurrentLanguage } from '~/lib/i18n/get-current-language'

export default function I18nDropdown(): JSX.Element {
  const options = ['ru', 'en']

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={onChange} name='themes' defaultValue={getCurrentLanguage()}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )

  function onChange(e: ChangeEvent<HTMLSelectElement>): void {
    changeLanguage(e.target.value)
  }
}

I18nDropdown.dispayName = 'I18nDropdown'
