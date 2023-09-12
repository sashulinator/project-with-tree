import './rule-item.scss'

import { useMutation } from 'react-query'

import Flex from '~/abstract/flex/ui/flex'
import { QueryResult } from '~/api/rules/fetch-rules'
import { requestRuleDelete } from '~/api/rules/requests/delete-rule'
import { ResponseData } from '~/api/rules/requests/fetch-rules'
import { RulesRes } from '~/entities/rule/types/rules-type'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import Link from '~/ui/link'
import { c } from '~/utils/core'

RuleItem.displayName = 'rule-Item'

export interface Props {
  className?: string
  item: RulesRes
  fetcher: QueryResult<ResponseData>
}

export default function RuleItem(props: Props): JSX.Element {
  const mutation = useMutation(() => requestRuleDelete(props.item?.id.toString()), {
    onSuccess: () => {
      void props.fetcher.refetch()
      notify({ data: 'Удалено', type: 'success' })
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <div className={c(props.className, RuleItem.displayName)}>
      <Flex mainAxis='space-between' crossAxis='center' className='nameCell'>
        <Link
          to={routes.ruleUpdate.path.replace(':id', props.item?.id.toString() || '')}
        >{`${props.item?.name} (${props.item.keyName})`}</Link>
        <Flex gap='xxl' crossAxis='center'>
          <div>{props.item?.updatedBy}</div>
          <GhostButton onClick={onDelete}>
            <Close></Close>
          </GhostButton>
        </Flex>
      </Flex>
    </div>
  )

  function onDelete(): void {
    mutation.mutate()
  }
}
