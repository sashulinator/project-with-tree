import Flex from '~/abstract/flex/ui/flex'

import { useMemo, useRef, useState } from 'react'
import Input from '~/ui/input'

import { useBoolean } from '~/utils/hooks'
import Checkbox from '~/storybook-new/checkbox'
import { Joint, Node } from '~/entities/decision/ui/editor/widgets/-node'
import { Position } from '~/utils/core'
import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'
import { NodeState } from '~/entities/decision/ui/editor/widgets/_node'
import { Point } from '~/entities/point'

export const uiCanvasNode = {
  name: Node.displayName,
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

export function Page(): JSX.Element {
  const state = useMemo(() => new NodeState({ point: point1 }), [])

  return (
    <Flex dir='column' gap='xl' width='100%'>
      <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
        <Node
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
              <Joint variant='linked' linkId='test1' />
              <Joint variant='new' linkId='test' />
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
                <span>Rule</span> <Joint variant='unlinked' linkId='test' />
              </div>
            </Flex>
          }
          onGestureDrug={(event): void => {
            const x = state.position.last.x + event.movement[0]
            const y = state.position.last.y + event.movement[1]
            state.position.move(x, y, event.last)
          }}
          style={{ border: '1px solid red', width: '300px' }}
        />
      </svg>
    </Flex>
  )
}