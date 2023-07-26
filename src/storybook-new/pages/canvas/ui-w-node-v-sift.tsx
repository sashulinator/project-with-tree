import Flex from '~/abstract/flex/ui/flex'

import { useRef, useState } from 'react'
import Input from '~/ui/input'

import { useBoolean } from '~/utils/hooks'
import Checkbox from '~/storybook-new/checkbox'

import { Position } from '~/utils/core'

import { NewSiftNode } from '~/entities/decision/ui/editor/widgets/_node/variants/sift copy'

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

export function Page(): JSX.Element {
  const initialDrugPosition = useRef<Position | null>(null)
  const [x, setX] = useState('20')
  const [y, setY] = useState('20')
  const [content, , , toggleContent] = useBoolean(false)
  const [title, setTitle] = useState('test')

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
        <NewSiftNode
          dataId='tets'
          remove={(): void => console.log('remove!')}
          title={title}
          onTitleChange={setTitle}
          onGestureDrug={(event): void => {
            if (initialDrugPosition.current === null)
              initialDrugPosition.current = { x: parseInt(x, 10), y: parseInt(y, 10) }
            setX(Math.round(initialDrugPosition.current.x + event.movement[0]).toString())
            setY(Math.round(initialDrugPosition.current.y + event.movement[1]).toString())
            if (event.last) initialDrugPosition.current = null
          }}
          y={y}
          x={x}
        />
      </svg>
    </Flex>
  )
}
