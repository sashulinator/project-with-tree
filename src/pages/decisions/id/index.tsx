import './index.css'

import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchDecision } from '~/api/decision/fetch'
// import { useFetchDecisionMock } from '~/api/decision/fetch-mock'
import { useUpdateDecision } from '~/api/decision/update'
import { useFetchRulesList } from '~/api/rules/fetch-rules'
import { Decision, Editor } from '~/entities/decision'
import { notify } from '~/shared/notify'
import { assertDefined } from '~/utils/core'

export default function DecisionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  assertDefined(id)
  // const fetcher = useFetchDecisionMock({ id })
  const fetcher = useFetchDecision({ id }, { staleTime: 1 })

  const mutator = useUpdateDecision({
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const ruleListFetcher = useFetchRulesList({ page: 1, limit: 1000 })
  const filteredRuleList = useMemo(() => ruleListFetcher.data?.items || [], [ruleListFetcher.data])

  return (
    <main key={String(fetcher.isFetching)} className='DecisionIdPage'>
      {fetcher.data && (
        <Editor
          onSubmit={(states): void => {
            const items = states.nodeList.values().map((nodeController) => {
              const links = states.linkList.getBySourceId(nodeController.point.id)
              const point = nodeController.deserialize()
              point['children'] = links.map((l, i) => {
                const link = l.toLink()
                link.index = link.index ?? i
                return link
              })
              return point
            })

            const decision: Decision = {
              ...fetcher.data,
              decisionTree: items,
            }

            mutator.mutate({ editorDecision: decision })
          }}
          decision={fetcher.data}
          ruleList={filteredRuleList}
        />
      )}
    </main>
  )

  // Private
}
