import AddButton from '../add-button/add-button'
import DeleteButton from '../delete-button/delete-button'
import EditorRules, { MentionsItem } from '../editor-rules/editor-rules'
import Radio from '../radio/radio'

interface Props {
  id: number
  setEditorValues: React.Dispatch<
    React.SetStateAction<
      {
        id: number
        value: string
      }[]
    >
  >
  mentionsData: MentionsItem[]
  value: string
  lastElement: boolean
  oneElement: boolean
}

export default function EditorItem(props: Props): JSX.Element {
  const { id, setEditorValues, mentionsData, value, lastElement, oneElement } = props
  return (
    <>
      <EditorRules id={id} mentionsData={mentionsData} value={value} setValue={setEditorValues} />
      {lastElement && <AddButton setEditorValues={setEditorValues} />}
      {!oneElement && <DeleteButton setEditorValues={setEditorValues} id={id} />}
      {!lastElement && <Radio id={id} />}
    </>
  )
}
