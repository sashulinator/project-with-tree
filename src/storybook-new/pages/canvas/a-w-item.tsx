import Flex from '~/abstract/flex/ui/flex'

import { Item } from '~/abstract/canvas'
import { useState } from 'react'
import Input from '~/ui/input'

import { useBoolean } from '~/utils/hooks'
import Checkbox from '~/ui/checkbox'

export const aCanvasWItem = {
  name: Item.displayName,
  element: Page,
  description:
    ' Представляет собой foreignObject, который программным путем следит на изменением размеров контента и подстраивается под него',
  features: ['Подстраивается под размер контента', 'Координатность'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

export function Page(): JSX.Element {
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
        <Checkbox height='s' placeholder='add_content' id='square' checked={content} onChange={toggleContent} />
      </Flex>
      <svg width='100%' height='333px' style={{ border: '1px solid red' }}>
        <Item y={y} x={x} dataId={'test'}>
          <div style={{ border: '1px solid blue' }}>
            Hello{' '}
            {content && (
              <>
                <br />
                World
              </>
            )}
          </div>
        </Item>
      </svg>
    </Flex>
  )
}
