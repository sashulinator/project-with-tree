import './item.css'

import { useRecoilState, useSetRecoilState } from 'recoil'

import Flex, { FlexProps } from '~/abstract/flex/ui/flex'
import { getCheckedArr } from '~/entities/rules/lib/get-checked-arr'
import { onDropTextarea } from '~/entities/rules/lib/on-drop-textarea'
import { draggableCardAtom } from '~/entities/rules/models/draggableCard'
import { EditorItem, editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import Checkbox from '~/ui/checkbox/ui/checkbox'
import { c } from '~/utils/core'
import { preventDefault, stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'

import AddDeleteButtons from '../widgets/add-delete-buttons/ui/add-delete-buttons'
import Input from '../widgets/input'

interface Props {
  values: EditorItem[]
  id: string
  checked: boolean
  rootProps?: FlexProps
}

Item.displayName = 'ruleEditor-w-Rules-w-Item'

export function Item(props: Props): JSX.Element {
  const { values, id, checked, rootProps } = props
  const setEditorVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <Flex crossAxis='center' gap='xl' className={c(Item.displayName, rootProps?.className)} {...rootProps}>
      <Checkbox checked={checked} onChange={handleCheck} style={{ cursor: 'pointer' }} />
      <ul className='list'>
        {values.map((item, i) => (
          <li key={item.id}>
            <Input id={item.id} value={item.value} parentId={id} />
            {i !== values.length - 1 && <AddDeleteButtons id={item.id} />}
          </li>
        ))}
      </ul>
    </Flex>
  )

  // Private
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>): void {
    let checked = false
    if (e.target.checked) {
      checked = true
    }
    setEditorVales((arr) => getCheckedArr(arr, checked, id))
  }
}
