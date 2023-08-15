import './item.css'

import Flex, { FlexProps } from '~/abstract/flex/ui/flex'
import { EditorItem } from '~/entities/rules/models/editorRulesValues'
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

  return (
    <Flex crossAxis='center' gap='xl' className={c(Item.displayName, rootProps?.className)} {...rootProps}>
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
}
