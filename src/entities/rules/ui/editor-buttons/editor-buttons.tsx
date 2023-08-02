import Flex, { FlexProps } from '~/abstract/flex'
import { GhostButton } from '~/ui/button'
import { Radio } from '../radio/radio'
import { editorRulesValuesAtom } from '../../state/state'
import { useRecoilState } from 'recoil'
import uniqid from 'uniqid'
import { Close, Plus } from '~/ui/icon'
import './editor-buttons.css'
import { c } from '~/utils/core'
interface ButtonsProps {
  id: string
  rootProps?: FlexProps
}

EditorButtons.displayName = 'e-rules-ui-EditorButtons'

export function EditorButtons(props: ButtonsProps): JSX.Element {
  const { id, rootProps } = props
  const [editorRulesValues, setEditorRulesValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <Flex className={c(EditorButtons.displayName, rootProps?.className)} gap='xl' {...rootProps}>
      <GhostButton height={'s'} square onClick={deleteCondition}>
        <Close />
      </GhostButton>
      <GhostButton height={'s'} square onClick={addCondition}>
        <Plus />
      </GhostButton>
      <Radio id={id} />
    </Flex>
  )

  // Private
  function deleteCondition(): void {
    const result = editorRulesValues
      .map((arr) => {
        if (arr.valueArr.length !== 1) {
          return { ...arr, valueArr: arr.valueArr.filter((item) => item.id !== id) }
        }
        return { ...arr, valueArr: arr.valueArr.filter(() => arr.id !== id) }
      })
      .filter((arr) => arr.valueArr.length > 0)
    console.log(result)
    setEditorRulesValues(result)
  }

  function addCondition(): void {
    setEditorRulesValues([...editorRulesValues, { id: uniqid(), valueArr: [{ id: uniqid(), value: '' }] }])
  }
}
