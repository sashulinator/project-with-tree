import './index.css'

import { useParams } from 'react-router-dom'

import { useFetchDecision } from '~/api/decision/fetch'
import { useUpdateDecision } from '~/api/decision/update'
import { Decision, Editor } from '~/entities/decision'
import { notify } from '~/shared/notify'
import { assertDefined } from '~/utils/core'

export default function DecisionPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  assertDefined(id)
  const fetcher = useFetchDecision({ id })

  const mutator = useUpdateDecision({
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main className='DecisionIdPage'>
      {fetcher.data && (
        <Editor
          onSubmit={(states): void => {
            const items = states.nodeListState.values().map((nodeState) => {
              const links = states.linkListState.getLinksBySourceId(nodeState.point.id)
              const point = nodeState.deserialize()
              point['children'] = links.map((l, i) => {
                const ruleSet = l.deserialize()
                ruleSet.index = ruleSet.index ?? i
                return ruleSet
              })
              return point
            })

            const decision: Decision = {
              ...fetcher.data,
              decisionTree: items,
            }

            mutator.mutate({ decision })
          }}
          decision={fetcher.data}
        />
      )}
    </main>
  )

  // Private
}
