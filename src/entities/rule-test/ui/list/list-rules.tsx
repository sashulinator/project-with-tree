import './list-rules.css'

import { useEffect, useState } from 'react'

import Flex from '~/abstract/flex'
import { QueryResult } from '~/api/rules/fetch-rules'
import { ResponseData } from '~/api/rules/requests/fetch-rules'
import { AppearFrom } from '~/ui/animation'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled'
import { c } from '~/utils/core'

import { RulesRes } from '../../types/type'
import RuleItem from './widget/rule-item/rule-item'

ListRules.displayName = 'rules-e-ui-list'

export interface Props {
  className?: string
  list: RulesRes[]
  fetcher: QueryResult<ResponseData>
  handleCopyRuleOpen: (data: RulesRes) => void
}

export default function ListRules(props: Props): JSX.Element {
  const [data, setData] = useState(props.list)
  const [value, setValue] = useState({ name: '', keyName: '' })

  useEffect(searchRule, [value, props.list])

  return (
    <ul className={c(props.className, ListRules.displayName)}>
      <Flex crossAxis='center' gap='xl'>
        <Labeled label='Поиск по наименованию'>
          <Input onChange={(e): void => setValue({ ...value, name: e.target.value })} />
        </Labeled>
        <Labeled label='Поиск по ключевому имени'>
          <Input onChange={(e): void => setValue({ ...value, keyName: e.target.value })} />
        </Labeled>
      </Flex>

      {data.map((item: RulesRes, i) => {
        return (
          <AppearFrom key={item.id} from={{ y: 10 }} delay={i * 30}>
            <RuleItem handleCopyRuleOpen={props.handleCopyRuleOpen} fetcher={props.fetcher} item={item} />
          </AppearFrom>
        )
      })}
    </ul>
  )

  function searchRule(): void {
    const result: RulesRes[] = props.list
      .filter((item) => item.name.toLowerCase().includes(value.name.toLowerCase()))
      .filter((item) => item.keyName.toLowerCase().includes(value.keyName.toLowerCase()))
    setData(result)
  }
}
