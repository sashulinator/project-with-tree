import { useMemo } from 'react'

import { ListState as LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/link'

import { Point } from '~/entities/point'

import { FilterNode, State } from '~/entities/decision/ui/editor/widgets/node'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NodeListState } from '~/entities/decision/ui/editor'

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
    {
      id: 'id1',
      name: 'name',
      sourceId: 'id1',
      targetId: 'id2',
      i: 1,
    },
  ])

  const states = new NodeListState([point1, point2])

  return (
    <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
      <DndProvider backend={HTML5Backend}>
        {states.values().map((state) => {
          return (
            <FilterNode
              nodeListState={states}
              key={state.id}
              state={state}
              linkListState={linkStates}
              remove={(): void => console.log('remove!')}
              onGestureDrug={(event): void => {
                const x = state.position.last.x + event.movement[0]
                const y = state.position.last.y + event.movement[1]
                state.position.move(x, y, event.last)
              }}
            />
          )
        })}
      </DndProvider>
    </svg>
  )
}
