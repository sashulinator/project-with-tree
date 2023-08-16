import { useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { LinkListState, NodeListState } from '~/entities/decision/ui/editor'
import { FilterNode } from '~/entities/decision/ui/editor/widgets/canvas/widgets/node'
import { Point } from '~/entities/point'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'

const point1: Point = {
  id: 'id1',
  name: 'name1',
  type: 'FILTER',
  computation: 'parallel',
  x: 10,
  y: 10,
}
const point2: Point = {
  id: 'id2',
  name: 'name2',
  type: 'FILTER',
  computation: 'parallel',
  x: 510,
  y: 10,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export default {
  getName: (): string => FilterNode.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{FilterNode.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const states = useMemo(() => new NodeListState([point1, point2]), [])
    const linkStates = useMemo(
      () =>
        new LinkListState([
          {
            id: 'id1',
            name: 'name',
            sourceId: 'id1',
            targetId: 'id2',
            i: 1,
          },
        ]),
      []
    )

    return (
      <svg width='100%' height='100%' style={{ border: '1px solid red' }}>
        <DndProvider backend={HTML5Backend}>
          {states.values().map((state) => {
            return (
              <FilterNode
                {...props}
                nodeListState={states}
                key={state.id}
                state={state}
                linkListState={linkStates}
                remove={(): void => console.log('remove!')}
                onGestureDrug={(event): void => {
                  const x = state.position.start.x + event.movement[0]
                  const y = state.position.start.y + event.movement[1]
                  state.position.move({ x, y }, event)
                }}
              />
            )
          })}
        </DndProvider>
      </svg>
    )
  },

  controls: [],
} satisfies Config<State>
