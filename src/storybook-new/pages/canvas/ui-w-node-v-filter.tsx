import { useMemo } from 'react'

import { State as LinkState, ListState as LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/link'

import { Point } from '~/entities/point'
import { Prop } from '~/utils/notifier'
import { Id } from '~/utils/core'
import { FilterNode, State } from '~/entities/decision/ui/editor/widgets/node'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const decisionCanvasNodeVSift = {
  name: FilterNode.displayName,
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
    new LinkState({
      id: 'test',
      rule: {
        id: 'id1',
        name: 'name',
        sourceId: 'id1',
        targetId: 'id2',
        i: 1,
      },
    }),
  ])

  const state1 = useMemo(() => new State(point1), [])
  const state2 = useMemo(() => new State(point2), [])
  const selection = useMemo(() => new Prop([] as Id[]), [])

  return (
    <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
      <DndProvider backend={HTML5Backend}>
        <FilterNode
          selection={selection}
          state={state1}
          linkListStates={linkStates}
          remove={(): void => console.log('remove!')}
          onGestureDrug={(event): void => {
            const x = state1.position.last.x + event.movement[0]
            const y = state1.position.last.y + event.movement[1]
            state1.position.move(x, y, event.last)
          }}
        />
        <FilterNode
          selection={selection}
          state={state2}
          linkListStates={linkStates}
          remove={(): void => console.log('remove!')}
          onGestureDrug={(event): void => {
            const x = state2.position.last.x + event.movement[0]
            const y = state2.position.last.y + event.movement[1]
            state2.position.move(x, y, event.last)
          }}
        />
      </DndProvider>
    </svg>
  )
}
