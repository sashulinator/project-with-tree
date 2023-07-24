import React from 'react'
import Button from '~/ui/button'

interface Props {
  setEditorValues: React.Dispatch<
    React.SetStateAction<
      {
        id: number
        value: string
      }[]
    >
  >
}

export default function AddButton(props: Props): JSX.Element {
  const { setEditorValues } = props
  const addIf = (): void => {
    setEditorValues((arr) => [...arr, { id: arr[arr.length - 1].id + 1, value: '' }])
  }
  return (
    <Button height={'s'} onClick={addIf}>
      Добавить условие
    </Button>
  )
}
