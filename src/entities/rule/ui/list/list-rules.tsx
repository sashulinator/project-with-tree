import './list-rules.css'

import { QueryResult } from '~/api/rules/fetch-rules'
import { ResponseData } from '~/api/rules/requests/fetch-rules'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'

import { RulesRes } from '../../types/rules-type'
import RuleItem from './widget/rule-item/rule-item'

ListRules.displayName = 'rules-e-ui-list'

export interface Props {
  className?: string
  list: RulesRes[]
  fetcher: QueryResult<ResponseData>
  handleCopyRuleOpen: (data: RulesRes) => void
}

export default function ListRules(props: Props): JSX.Element {
  return (
    <ul className={c(props.className, ListRules.displayName)}>
      {props.list.map((item: RulesRes, i) => {
        return (
          <AppearFrom key={item.id} from={{ y: 10 }} delay={i * 30}>
            <RuleItem handleCopyRuleOpen={props.handleCopyRuleOpen} fetcher={props.fetcher} item={item} />
          </AppearFrom>
        )
      })}
    </ul>
  )
}
