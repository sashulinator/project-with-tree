import Flex from '~/abstract/flex/ui/flex'

import { useRef, useState } from 'react'
import Input from '~/ui/input'

import { useBoolean } from '~/utils/hooks'
import Checkbox from '~/storybook-new/checkbox'
import { Joint, NewNode } from '~/entities/decision/ui/editor/widgets/-node'
import { Position } from '~/utils/core'
import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'

export const uiCanvasNode = {
  name: NewNode.displayName,
  element: Page,
  description: 'Компонент Node наследующий ui-Item',
  features: ['Разбивка на зоны toolbar, title, links'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

export function Page(): JSX.Element {
  const initialDrugPosition = useRef<Position | null>(null)
  const [x, setX] = useState('20')
  const [y, setY] = useState('20')
  const [content, , , toggleContent] = useBoolean(false)

  return (
    <Flex dir='column' gap='xl' width='100%'>
      <Flex mainAxis='center' gap='l'>
        <Flex width='5rem' gap='s' mainAxis='center' crossAxis='center'>
          x:
          <Input height='s' value={x} onChange={(e): void => setX(e.target.value)} />
        </Flex>
        <Flex width='5rem' gap='s' mainAxis='center' crossAxis='center'>
          y:
          <Input height='s' value={y} onChange={(e): void => setY(e.target.value)} />
        </Flex>
        <Checkbox placeholder='add_content' id='square' checked={content} onChange={toggleContent} />
      </Flex>
      <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
        <NewNode
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
          sourceLinks={
            <Flex style={{ border: '1px solid blue' }} gap='xxl' dir='column' padding='var(--xxl) .2rem'>
              <Joint variant='linked' linkId='test1' />
              <Joint variant='new' linkId='test' />
            </Flex>
          }
          targetLinks={
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
            if (initialDrugPosition.current === null)
              initialDrugPosition.current = { x: parseInt(x, 10), y: parseInt(y, 10) }

            setX(Math.round(initialDrugPosition.current.x + event.movement[0]).toString())
            setY(Math.round(initialDrugPosition.current.y + event.movement[1]).toString())

            if (event.last) initialDrugPosition.current = null
          }}
          style={{ border: '1px solid red', width: '300px' }}
          y={y}
          x={x}
          dataId={'test'}
        />
      </svg>
    </Flex>
  )
}
