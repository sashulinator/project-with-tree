// import Callout, { top } from '~/ui/callout'

import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import { Item } from '~/abstract/canvas'
import { useState } from 'react'
import Input from '~/ui/input'

export default function FieldPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>CANVAS</H1>
        <p>Состоит из виджетов</p>
        <br />
      </PageSection>
      <PageSection>
        <FieldSection />
      </PageSection>
    </Flex>
  )
}

function FieldSection(): JSX.Element {
  const [x, setX] = useState('20')
  const [y, setY] = useState('20')

  return (
    <Section
      header={
        <>
          <H2>Item</H2>
          <br />
          Представляет собой foreignObject, который отрисовывает детей и задает себе их ширину и высоту
          <br />
          <ol>
            <li>Ширина/высота детей</li>
            <li>Координаты</li>
          </ol>
          <Flex width='9rem' margin='1rem 0 0 0' gap='s'>
            x:
            <Input height='s' value={x} onChange={(e): void => setX(e.target.value)} />
            y:
            <Input height='s' value={y} onChange={(e): void => setY(e.target.value)} />
          </Flex>
        </>
      }
    >
      <svg width='100%' height='100px' style={{ border: '1px solid red' }}>
        <Item y={y} x={x} dataId={'test'}>
          <div style={{ border: '1px solid blue' }}>Hello</div>
        </Item>
      </svg>
    </Section>
  )
}
