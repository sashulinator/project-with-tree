import './index.css'

import { useMemo } from 'react'

import { useCreateDecision } from '~/api/decision/create'
import { useFetchRulesList } from '~/api/rules/fetch-rules'
import { Editor, EditorDecision } from '~/entities/decision'
import { notify } from '~/shared/notify'

const decision: EditorDecision = {
  name: 'new_tree',
  decisionTree: [
    {
      id: 'main',
      name: 'ВХОД',
      xy: [0, -84],
      level: 'main',
    },
  ],
}

export default function Page(): JSX.Element {
  const mutator = useCreateDecision({
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const ruleListFetcher = useFetchRulesList({ page: 1, limit: 1000 })
  const filteredRuleList = useMemo(() => ruleListFetcher.data?.items || [], [ruleListFetcher.data])

  return (
    <main className='DecisionCreatePage'>
      <Editor
        onSubmit={(states): void => {
          const items = states.nodeList.values().map((nodeController) => {
            const links = states.linkList.getLinksBySourceId(nodeController.point.id)
            const point = nodeController.deserialize()
            point['children'] = links.map((l, i) => {
              const ruleSet = l.deserialize()
              ruleSet.index = ruleSet.index ?? i
              return ruleSet
            })
            return point
          })

          const decision: EditorDecision = {
            name: states.editor.name.value,
            decisionTree: items,
          }

          mutator.mutate({ editorDecision: decision })
        }}
        decision={decision}
        ruleList={filteredRuleList}
      />
    </main>
  )

  // Private
}
