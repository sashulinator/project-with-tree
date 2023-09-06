import './item.css'

import Flex, { FlexProps } from '~/abstract/flex/ui/flex'
import { EditorItem, SelectValue } from '~/entities/rule/models/editorRulesValues'
import { c } from '~/utils/core'

import AddDeleteButtons from '../widgets/add-delete-buttons/ui/add-delete-buttons'
import Input from '../widgets/input'

interface Props {
  values: EditorItem[]
  id: string
  rootProps?: FlexProps
  condition: SelectValue
}

Item.displayName = 'ruleEditor-w-Rules-w-Item'

export function Item(props: Props): JSX.Element {
  const { values, id, rootProps, condition } = props

  return (
    <Flex crossAxis='center' gap='xl' className={c(Item.displayName, rootProps?.className)} {...rootProps}>
      <ul className='list'>
        {values.map((item, i) => {
          return (
            <li key={item.id}>
              <Input condition={condition} id={item.id} value={item.value} parentId={id} />
              {i !== values.length - 1 && (
                <AddDeleteButtons
                  condition={item?.condition || null}
                  parentId={id}
                  itemId={item.id}
                  isDragOver={false}
                />
              )}
            </li>
          )
        })}
      </ul>
    </Flex>
  )
}
