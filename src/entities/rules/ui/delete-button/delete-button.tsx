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
  id: number
}

export default function DeleteButton(props: Props): JSX.Element {
  const { setEditorValues, id } = props
  const deleteIf = (): void => {
    setEditorValues((arr) => arr.filter((item) => item.id !== id))
  }
  return (
    <Button height={'s'} onClick={deleteIf}>
      Удалить условие
    </Button>
  )
}
