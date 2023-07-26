import React from 'react'

import Flex from '~/abstract/flex'
import Checkbox from '~/storybook-new/checkbox'
import { H1 } from '~/ui/heading'

import { Ol } from '~/ui/list'
import PageSection from '~/ui/page-section'
import Paragraph from '~/ui/paragraph/ui/paragraph'
import { c } from '~/utils/core'
import { useBoolean } from '~/utils/hooks'

interface SectionProps {
  h1?: string | undefined
  h2?: string | undefined
  description: string
  features?: readonly string[] | undefined
  extends?:
    | {
        name: string | undefined
        list: string[]
      }
    | undefined
  toolbar?: React.ReactNode
  children: React.ReactNode
}

export default function Section(props: SectionProps): JSX.Element {
  const [isSecondBg, , , toggleSecondBg] = useBoolean(true)

  return (
    <PageSection>
      <Flex dir='column' gap='xxxl'>
        <Flex dir='column'>
          {props.h1 && <H1>{props.h1}</H1>}
          {props.h2 && <H1>{props.h2}</H1>}
          <Paragraph>{props.description}</Paragraph>
          {props.extends && <>Наследует от {props.extends.name}</>}
          {props.extends && (
            <Ol>
              {props.extends.list.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </Ol>
          )}

          {props.features?.length && (
            <>
              Функциональность<Ol>{props.features?.map((s) => <li key={s}>{s}</li>)}</Ol>
            </>
          )}
        </Flex>
        <hr style={{ width: '100%', opacity: '.2' }} />
        <Flex
          width='100%'
          style={{ borderRadius: 'var(--m)' }}
          padding='2rem'
          className={c(isSecondBg && 'bg', 'gggggg')}
          dir='column'
          gap='l'
        >
          <Flex width='1rem' gap='s' mainAxis='center' crossAxis='center'>
            <Checkbox checked={isSecondBg} onChange={toggleSecondBg} />
            bg
          </Flex>
          {props.children}
        </Flex>
      </Flex>
    </PageSection>
  )
}
