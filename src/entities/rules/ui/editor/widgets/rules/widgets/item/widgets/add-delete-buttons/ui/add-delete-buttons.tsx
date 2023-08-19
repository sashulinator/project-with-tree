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
  parentId: string
  flexProps?: FlexProps
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  isDragOver: boolean
}

AddDeleteButtons.displayName = 'ruleEditor-w-Rules-w-AddDeleteButtons'

export default function AddDeleteButtons(props: ButtonsProps): JSX.Element {
  const { itemId, flexProps, isDragOver, parentId, rootProps } = props
  const [editorRulesValues, setEditorValues] = useRecoilState(editorRulesValuesAtom)

  return (
    <div {...rootProps} className={c(AddDeleteButtons.displayName, rootProps?.className)}>
      <Flex gap='xl' crossAxis='center' {...flexProps}>
        <GhostButton height={'s'} square onClick={deleteCondition}>
          <Close />
        </GhostButton>
        <GhostButton height={'s'} square onClick={addCondition}>
          <Plus />
        </GhostButton>
        <Select id={itemId} />
      </Flex>
      {isDragOver && <div style={{ width: '100%', height: '50px', border: '1px solid yellow' }}></div>}
    </div>
  )

  // Private
  function deleteCondition(): void {
    if (editorRulesValues.length === 1 && parentId === itemId) {
      return
    }
    setEditorValues(getArrDeleteCondition(editorRulesValues, itemId, parentId))
  }

  function addCondition(): void {
    setEditorValues(getArrAddCondition(editorRulesValues, itemId, parentId))
  }
}
