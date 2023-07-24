import React from 'react'

import Flex from '~/abstract/flex'
import { H1 } from '~/ui/heading'
import { Ol } from '~/ui/list'
import PageSection from '~/ui/page-section'
import Paragraph from '~/ui/paragraph/ui/paragraph'

interface SectionProps {
  h1?: string | undefined
  h2?: string | undefined
  description: string
  features?: string[]
  extends?: string[]
  extendsName?: string | undefined
  toolbar?: React.ReactNode
  children: React.ReactNode
}

export default function Section(props: SectionProps): JSX.Element {
  return (
    <PageSection>
      <Flex dir='column' gap='xxxl'>
        <Flex dir='column'>
          {props.h1 && <H1>{props.h1}</H1>}
          {props.h2 && <H1>{props.h2}</H1>}
          <Paragraph>{props.description}</Paragraph>
          {props.extendsName && <>Наследует от {props.extendsName}</>}
          {props.extends?.length && <Ol>{props.extends?.map((s) => <li key={s}>{s}</li>)}</Ol>}

          {props.features?.length && (
            <>
              Функциональность<Ol>{props.features?.map((s) => <li key={s}>{s}</li>)}</Ol>
            </>
          )}
        </Flex>
        <hr style={{ width: '100%', opacity: '.2' }} />
        {props.toolbar}
        <Flex>
          <Flex width='50%' padding='2rem 2rem 2rem 0'>
            {props.children}
          </Flex>
          <Flex width='50%' padding='2rem' className='bg' style={{ borderRadius: 'var(--xl)' }}>
            {props.children}
          </Flex>
        </Flex>
      </Flex>
    </PageSection>
  )
}
