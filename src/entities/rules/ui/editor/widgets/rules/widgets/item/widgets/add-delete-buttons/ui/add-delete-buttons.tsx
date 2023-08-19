import './add-delete-buttons.css'

import { useRecoilState } from 'recoil'

import Flex, { FlexProps } from '~/abstract/flex'
import { getArrAddCondition } from '~/entities/rules/lib/get-arr-add-condition'
import { getArrDeleteCondition } from '~/entities/rules/lib/get-arr-delete-condition'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { GhostButton } from '~/ui/button'
import { Close, Plus } from '~/ui/icon'
import { c } from '~/utils/core'

import Select from '../../select/ui/select'

interface ButtonsProps {
  itemId: string
  rootProps?: FlexProps
}

AddDeleteButtons.displayName = 'ruleEditor-w-Rules-w-AddDeleteButtons'

export default function AddDeleteButtons(props: ButtonsProps): JSX.Element {
  const { itemId, rootProps } = props
  const [editorRulesValues, setEditorValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <Flex className={c(AddDeleteButtons.displayName, rootProps?.className)} gap='xl' crossAxis='center' {...rootProps}>
      <GhostButton height={'s'} square onClick={deleteCondition}>
        <Close />
      </GhostButton>
      <GhostButton height={'s'} square onClick={addCondition}>
        <Plus />
      </GhostButton>
      <Select id={itemId} />
    </Flex>
  )

  // Private
  function deleteCondition(): void {
    if (editorRulesValues.length === 1) {
      return
    }
    setEditorValues(getArrDeleteCondition(editorRulesValues, itemId))
  }

  function addCondition(): void {
    setEditorValues(getArrAddCondition(editorRulesValues, itemId))
  }
}
