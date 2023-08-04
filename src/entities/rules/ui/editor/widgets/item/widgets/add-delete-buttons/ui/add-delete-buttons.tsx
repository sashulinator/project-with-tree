import './add-delete-buttons.css'

import Flex, { FlexProps } from '~/abstract/flex'
import { GhostButton } from '~/ui/button'
import { useRecoilState } from 'recoil'
import uniqid from 'uniqid'
import { Close, Plus } from '~/ui/icon'
import { c } from '~/utils/core'
import Radio from '../../radio'
import { editorRulesValuesAtom } from '~/entities/rules/models'

interface ButtonsProps {
  id: string
  rootProps?: FlexProps
}

AddDeleteButtons.displayName = 'e-Rules-ui-Editor-w-AddDeleteButtons'

export default function AddDeleteButtons(props: ButtonsProps): JSX.Element {
  const { id, rootProps } = props
  const [editorRulesValues, setEditorValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <Flex className={c(AddDeleteButtons.displayName, rootProps?.className)} gap='xl' {...rootProps}>
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
    setEditorValues(result)
  }

  function addCondition(): void {
    setEditorValues([...editorRulesValues, { id: uniqid(), valueArr: [{ id: uniqid(), value: '' }] }])
  }
}