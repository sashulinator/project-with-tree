import './index.css'

import { useCreateDecision } from '~/api/decision/create'
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
      children: [
        {
          id: 'a1',
          index: 0,
        },
      ],
    },
  ],
}

export default function Page(): JSX.Element {
  const mutator = useCreateDecision({
    onSuccess: () => notify({ data: 'Сохранено', type: 'success' }),
    onError: () => notify({ data: 'Ошибка', type: 'error' }),
  })

  return (
    <main className='DecisionCreatePage'>
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

          const decision: EditorDecision = {
            name: states.editorManager.name.value,
            decisionTree: items,
          }

          mutator.mutate({ editorDecision: decision })
        }}
        decision={decision}
      />
    </main>
  )

  // Private
}
