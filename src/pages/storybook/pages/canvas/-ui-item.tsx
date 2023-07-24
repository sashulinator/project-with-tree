import Flex from '~/abstract/flex/ui/flex'

import { H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import { Item } from '~/ui/canvas'
import { Item as AbstractItem } from '~/abstract/canvas'
import { useRef, useState } from 'react'
import Input from '~/ui/input'
import Paragraph from '~/ui/paragraph'
import { Ol } from '~/ui/list/variants/ol'
import { useBoolean } from '~/utils/hooks'
import Checkbox from '../../checkbox'
import { Position } from '~/utils/core'

export function UIItem(): JSX.Element {
  const initialDrugPosition = useRef<Position | null>(null)
  const [x, setX] = useState('20')
  const [y, setY] = useState('20')
  const [content, , , toggleContent] = useBoolean(false)

  return (
    <PageSection>
      <Section
        header={
          <>
            <H2>{Item.displayName}</H2>
            <Paragraph>
              Представляет собой foreignObject, который программным путем следит на изменением размеров контента и
              подстраивается под него
            </Paragraph>
            Фичи:
            <Ol>
              <li>Драгабл</li>
            </Ol>
            Наследует {AbstractItem.displayName}:
            <Ol>
              <li>Подстраивается под размер контента</li>
              <li>Координатность</li>
            </Ol>
          </>
        }
        toolbar={
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
        }
      >
        <svg width='100%' height='100px' style={{ border: '1px solid red' }}>
          <Item
            y={y}
            x={x}
            dataId={'test'}
            onGestureDrug={(event): void => {
              if (initialDrugPosition.current === null)
                initialDrugPosition.current = { x: parseInt(x, 10), y: parseInt(y, 10) }

              setX(Math.round(initialDrugPosition.current.x + event.movement[0]).toString())
              setY(Math.round(initialDrugPosition.current.y + event.movement[1]).toString())

              if (event.last) initialDrugPosition.current = null
            }}
          >
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
      </Section>
    </PageSection>
  )
}