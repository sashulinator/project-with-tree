import './item.css'

import { useRecoilState } from 'recoil'

import Flex, { FlexProps } from '~/abstract/flex/ui/flex'
import { onDropItemToItem } from '~/entities/rules/lib/on-drop-item-to-item'
import { dragOverIdAtom } from '~/entities/rules/models/drag-over-id'
import { draggableItemAtom } from '~/entities/rules/models/draggableItem'
import { EditorItem, editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { c } from '~/utils/core'

import AddDeleteButtons from '../widgets/add-delete-buttons/ui/add-delete-buttons'
import Input from '../widgets/input'

interface Props {
  values: EditorItem[]
  id: string
  rootProps?: FlexProps
}

Item.displayName = 'ruleEditor-w-Rules-w-Item'

export function Item(props: Props): JSX.Element {
  const { values, id, rootProps } = props
  const [editorValue, setEditorValues] = useRecoilState(editorRulesValuesAtom)
  const [draggableItem, setDraggableItem] = useRecoilState(draggableItemAtom)
  const [dragOverId, setDragOverId] = useRecoilState(dragOverIdAtom)
  return (
    <Flex crossAxis='center' gap='xl' className={c(Item.displayName, rootProps?.className)} {...rootProps}>
      <ul className='list'>
        {values.map((item, i) => {
          return (
            <li key={item.id}>
              <Input id={item.id} value={item.value} parentId={id} />
              {i !== values.length - 1 && <AddDeleteButtons itemId={item.id} />}
            </li>
          )
        })}
      </ul>
    </Flex>
  )
}
