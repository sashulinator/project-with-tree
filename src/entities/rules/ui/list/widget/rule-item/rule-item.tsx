import './rule-item.scss'

import { RulesRes } from '~/entities/rules/types/rules-type'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import { c } from '~/utils/core'

RuleItem.displayName = 'rule-Item'

export interface Props {
  className?: string
  item: RulesRes
}

export default function RuleItem(props: Props): JSX.Element {
  return (
    <div className={c(props.className, RuleItem.displayName)}>
      <div className='nameCell'>
        <Link to={routes.ruleCreate.path.replace(':id', props.item?.id.toString() || '')}>{props.item?.name}</Link>
      </div>

      <div className={c('statusCell', `--${props.item?.rev.toLowerCase()}`)}>{props.item?.updatedBy}</div>
    </div>
  )
}
