import './index.css'

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateDecision } from '~/api/decision/create'
import { useFetchRulesList } from '~/api/rules/fetch-rules'
import { Editor, EditorDecision } from '~/entities/decision'
import { notify } from '~/shared/notify'
import { routes } from '~/shared/routes'
import { Id } from '~/utils/core'

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
  const navigate = useNavigate()

  const mutator = useCreateDecision({
    onSuccess: (data) => {
      notify({ data: 'Сохранено', type: 'success' })
      navigate(routes.decisionId.getURL(data.data.id || ''))
    },
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  const ruleListFetcher = useFetchRulesList({ page: 1, limit: 1000 })
  const filteredRuleList = useMemo(() => ruleListFetcher.data?.items || [], [ruleListFetcher.data])

  return (
    <main className='DecisionCreatePage'>
      <Editor
        onSubmit={(states): void => {
          const items = states.nodeList.values().map((nodeController) => {
            const links = states.linkList.getBySourceId(nodeController.point.id)
            const point = nodeController.deserialize()
            const children = links.map((l, i) => {
              const link = l.toLink()
              link.index = link.index ?? i
              return { ...link, rules: link.rules?.map((r): Id => r.id) }
            })
            return { ...point, children }
          })

          const decision: EditorDecision = {
            name: states.editor.name.value,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            decisionTree: items as any,
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
