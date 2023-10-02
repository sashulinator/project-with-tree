import { useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Point } from '~/entities/decision'
import { LinkListController, NodeListController } from '~/entities/decision/ui/editor'
import { DecisionPointNode } from '~/entities/decision/ui/editor/widgets/canvas/widgets/node'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { emptyFn } from '~/utils/function/empty-fn'

const point1: Point = {
  id: 'id1',
  name: 'name1',
  level: 'decisionPoint',
  computation: 'parallel',
  xy: [10, 10],
}
const point2: Point = {
  id: 'id2',
  name: 'name2',
  level: 'decisionPoint',
  computation: 'parallel',
  xy: [510, 10],
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export default {
  getName: (): string => DecisionPointNode.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{DecisionPointNode.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const states = useMemo(() => new NodeListController([point1, point2]), [])
    const linkControllers = useMemo(
      () =>
        new LinkListController([
          {
            id: 'id1',
            name: 'string',
            level: 'decisionPoint',
            xy: [0, 1],
            componentName: 'string',
            computation: 'successively',
            children: [
              {
                id: 'id2',
                index: 1,
                rules: [
                  {
                    level: 'rule',
                    name: 'string',
                    id: 'id3',
                    keyName: 'est_keyname',
                    value: 'string',
                  },
                ],
              },
            ],
          },
        ]),
      []
    )

    return (
      <svg width='100%' height='100%' style={{ border: '1px solid red' }}>
        <DndProvider backend={HTML5Backend}>
          {states.values().map((state) => {
            return (
              <DecisionPointNode
                {...props}
                toggle={emptyFn}
                list={states}
                select={emptyFn}
                key={state.id}
                controller={state}
                linkList={linkControllers}
                onGestureDrag={(event): void => {
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
