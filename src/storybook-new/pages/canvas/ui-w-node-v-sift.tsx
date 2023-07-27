import { useMemo } from 'react'

import { NewSiftNode } from '~/entities/decision/ui/editor/widgets/_node/variants/new-sift'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { RuleLinkState } from '~/entities/decision/ui/editor/widgets/_link'
import { NodeState } from '~/entities/decision/ui/editor/widgets/_node'
import { Point } from '~/entities/point'

export const decisionCanvasNodeVSift = {
  name: NewSiftNode.displayName,
  element: Page,
  description: 'Компонент Node наследующий ui-Item',
  features: ['Разбивка на зоны toolbar, title, links'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

const point1: Point = {
  id: 'id1',
  name: 'name1',
  type: 'SIFT',
  computation: 'parallel',
  x: 10,
  y: 10,
}
const point2: Point = {
  id: 'id2',
  name: 'name2',
  type: 'SIFT',
  computation: 'parallel',
  x: 510,
  y: 10,
}

export function Page(): JSX.Element {
  const linkStates = new LinkStateDictionary([
    new RuleLinkState({
      id: 'test',
      rule: {
        id: 'id1',
        name: 'name',
        sourceId: 'id2',
        targetId: 'id1',
        i: 1,
      },
    }),
  ])

  const state1 = useMemo(() => new NodeState({ point: point1 }), [])
  const state2 = useMemo(() => new NodeState({ point: point2 }), [])

  return (
    <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
      <NewSiftNode
        state={state1}
        linkStates={linkStates}
        dataId='tets'
        remove={(): void => console.log('remove!')}
        onGestureDrug={(event): void => {
          const x = state1.position.last.x + event.movement[0]
          const y = state1.position.last.y + event.movement[1]
          state1.position.move(x, y, event.last)
        }}
      />
      <NewSiftNode
        state={state2}
        linkStates={linkStates}
        dataId='tets1'
        remove={(): void => console.log('remove!')}
        onGestureDrug={(event): void => {
          const x = state2.position.last.x + event.movement[0]
          const y = state2.position.last.y + event.movement[1]
          state2.position.move(x, y, event.last)
        }}
      />
    </svg>
  )
}
