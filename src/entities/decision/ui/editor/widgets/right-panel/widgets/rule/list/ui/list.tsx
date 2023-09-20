import './list.scss'

import { useState } from 'react'

import Flex from '~/abstract/flex'
import { RulesRes } from '~/entities/rule/types/rules-type'
import Input from '~/ui/input/ui/input'
import { Id, c } from '~/utils/core'

import Rule from '../..'

List.displayName = 'decision-Editor-w-RightPanel-w-RuleList'

export interface Props {
  className?: string
  list: RulesRes[]
  onSelect: (id: Id) => void
}

export default function List(props: Props): JSX.Element {
  const [query, setQuery] = useState('')

  const filteredList = props.list.filter((rule) => {
    return (
      rule.keyName?.toUpperCase().indexOf(query.toUpperCase()) !== -1 ||
      rule.name?.toUpperCase().indexOf(query.toUpperCase()) !== -1
    )
  })
  return (
    <div className={c(props.className, List.displayName)}>
      <Flex width='100%' margin='0 0 var(--l) 0'>
        <Input value={query} onChange={(e): void => setQuery(e.currentTarget.value)} />
      </Flex>
      <ul className='list' style={{ display: 'flex', gap: 'var(--l)', overflow: 'scroll' }}>
        {filteredList.map((rule) => {
          return (
            <li key={rule.id}>
              <Rule rule={rule} onSelect={props.onSelect} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
