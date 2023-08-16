import { useMemo } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { Node, NodeJoint, NodeListState, NodeState } from '~/entities/decision/ui/editor'
import { Point } from '~/entities/point'
import { Config, Props } from '~/storybook/types'
import { GhostButton } from '~/ui/button'
import { H1 } from '~/ui/heading'
import { Trash } from '~/ui/icon'
import Input from '~/ui/input'

const point1: Point = {
  id: 'id1',
  name: 'name1',
  type: 'FILTER',
  computation: 'parallel',
  x: 10,
  y: 10,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export default {
  getName: (): string => Node.displayName || '',

  getPath: (): string => `/${Node.displayName.toLowerCase()}`,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Node.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const state = useMemo(() => new NodeState(point1), [])
    const listState = new NodeListState([point1])

    return (
      <svg width='100%' height='100%' style={{ border: '1px solid red' }}>
        <Node
          {...props}
          listState={listState}
          state={state}
          toolbar={
            <div style={{ display: 'flex', justifyContent: 'end', padding: 'var(--s)' }}>
              <GhostButton height='s' style={{ padding: 'var(--l)' }}>
                Toolbar
              </GhostButton>
              <GhostButton height='s' square={true}>
                <Trash />
              </GhostButton>
            </div>
          }
          title={<Input height='l' value='title' />}
          targetLinks={
            <Flex style={{ border: '1px solid blue' }} gap='xxl' dir='column' padding='var(--xxl) .2rem'>
              <NodeJoint variant='linked' linkId='test1' />
              <NodeJoint variant='new' linkId='test' />
            </Flex>
          }
          sourceLinks={
            <Flex gap='xxl' width='100%' dir='column' padding='var(--l) .2rem'>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '40px',
                  padding: '0 0.2rem 0 1rem',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'grey',
                }}
              >
                <span>Rule</span> <NodeJoint variant='unlinked' linkId='test' />
              </div>
            </Flex>
          }
          onGestureDrug={(event): void => {
            const x = state.position.start.x + event.movement[0]
            const y = state.position.start.y + event.movement[1]
            state.position.move({ x, y }, event)
          }}
          style={{ border: '1px solid red', width: '300px' }}
        />
      </svg>
    )
  },

  controls: [],
} satisfies Config<State>