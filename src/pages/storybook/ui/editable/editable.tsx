import { useState } from 'react'

import Editable from '~/ui/editable/ui/editable'
import TextInput from '~/ui/text-input'
import { has } from '~/utils/core'

// import { ThemeDropdown } from '~/widgets/theme'

export default function TextInputPage(): JSX.Element {
  const [def, setDef] = useState('')

  return (
    <main className='pt-5rem'>
      <div
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
      >
        <h2 className='mb-2rem'>Editable</h2>

        <div className='mt-1rem'>
          <label htmlFor='s' className='label ml-0.25rem'>
            Default
          </label>
          <Editable value={def} onChange={(e): any => has(e.target, 'value') && setDef(e.target.value)} />
        </div>

        <label htmlFor='s' className='label ml-0.25rem'>
          Это обычный TextInput чтобы тестировать что Editable реагирует на смену value из вне
        </label>
        <TextInput value={def} onChange={(e): any => has(e.target, 'value') && setDef(e.target.value)} />
      </div>
    </main>
  )
}
