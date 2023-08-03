import { useState } from 'react'

interface RadioProps {
  id: string
}

export function Radio(props: RadioProps): JSX.Element {
  const { id } = props
  const [radioName, setRadioName] = useState(`and_${id}`)

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRadioName(e.target.value)
  }

  return (
    <div>
      <label>
        <input
          defaultChecked
          type='radio'
          id={`and_${id}`}
          value={`and_${id}`}
          onChange={handleChangeRadio}
          name={radioName}
        />
        и
      </label>
      <label>
        <input type='radio' id={`or_${id}`} value={`or_${id}`} onChange={handleChangeRadio} name={radioName} />
        или
      </label>
    </div>
  )
}
