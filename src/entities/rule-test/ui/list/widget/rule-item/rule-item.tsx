import './rule-item.scss'

import Flex from '~/abstract/flex/ui/flex'
import { QueryResult } from '~/api/rules/fetch-rules'
import { ResponseData } from '~/api/rules/requests/fetch-rules'
import { RulesRes } from '~/entities/rule-test/types/type'
import { routes } from '~/shared/routes'
import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import Link from '~/ui/link'
import { Id, c } from '~/utils/core'

RuleItem.displayName = 'rule-Item'

export interface Props {
  className?: string
  item: RulesRes
  fetcher: QueryResult<ResponseData>
  handleCopyRuleOpen: (data: RulesRes) => void
  openDeleteModal: (data: { name: string; id: Id }) => void
}

export default function RuleItem(props: Props): JSX.Element {
  return (
    <div className={c(props.className, RuleItem.displayName)}>
      <Flex mainAxis='space-between' crossAxis='center' className='nameCell'>
        <Link
          to={routes.ruleTestUpdate.path.replace(':id', props.item?.id.toString() || '')}
        >{`${props.item?.name} (${props.item.keyName})`}</Link>
        <Flex gap='xxl' crossAxis='center'>
          <div>{props.item?.updatedBy}</div>
          <GhostButton onClick={(): void => props.handleCopyRuleOpen(props.item)}>Копировать</GhostButton>
          <GhostButton square onClick={(): void => props.openDeleteModal({ name: props.item.name, id: props.item.id })}>
            <Close></Close>
          </GhostButton>
        </Flex>
      </Flex>
    </div>
  )
}
