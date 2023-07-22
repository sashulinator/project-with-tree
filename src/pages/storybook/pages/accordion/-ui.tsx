import Flex from '~/abstract/flex/ui/flex'

import { H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'
import { useBoolean } from '~/utils/hooks'

import Paragraph from '~/ui/paragraph'
import { Ol } from '~/ui/list/variants/ol'
import Accordion from '~/ui/accordion'
import { useState } from 'react'

export function UISection(): JSX.Element {
  const [height, setHeight] = useState<'s' | 'm' | 'l'>('m')
  const [variant, setVariant] = useState<'bg'>('bg')
  const [expanded, , , toggleExpanded] = useBoolean(true)
  const [controlled, , , toggleControlled] = useBoolean(true)
  const [content, , , toggleContent] = useBoolean(false)
  const [animation, , , toggleAnimation] = useBoolean(false)

  return (
    <PageSection>
      <Section
        header={
          <>
            <H2>{Accordion.displayName}</H2>
            <Paragraph>`Collapse` с `header`ом</Paragraph>
            Фичи:
            <Ol>
              <li>Controlled/uncontrolled isExpanded</li>
              <li>Height</li>
            </Ol>
          </>
        }
        toolbar={
          <Flex mainAxis='center' gap='l'>
            <Flex>
              <HeightDropdown value={height} onChange={setHeight} />
            </Flex>
            <Flex>
              <VariantsDropdown value={variant} onChange={setVariant} />
            </Flex>
            <Flex>
              <input type='checkbox' id='square' checked={expanded} onChange={toggleExpanded} />
              expanded
            </Flex>
            <Flex>
              <input type='checkbox' id='square' checked={controlled} onChange={toggleControlled} />
              controlled
            </Flex>
            <Flex>
              <input type='checkbox' id='square' checked={content} onChange={toggleContent} />
              add_content
            </Flex>
            <Flex>
              <input type='checkbox' id='square' checked={animation} onChange={toggleAnimation} />
              cool_animation
            </Flex>
          </Flex>
        }
      >
        <Accordion
          onExpandedChange={controlled ? toggleExpanded : undefined}
          isExpanded={controlled ? expanded : undefined}
          renderHeader={Header}
          height={height}
          variants={[variant]}
          headerProps={{ title: 'title' }}
          collapseProps={{
            from: animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined,
            to: animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined,
          }}
        >
          <div className='test-Body' style={{ border: '1px solid red' }}>
            Hello world
            {content && (
              <>
                <br />
                MoreContent
              </>
            )}
          </div>
        </Accordion>
      </Section>
    </PageSection>
  )
}

// Private

interface HeaderProps {
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

export default function Header(props: HeaderProps): JSX.Element {
  return (
    <div className='test-Header' style={{ border: '1px solid red' }}>
      {props.title}
      <button onClick={(): void => props.setExpanded(!props.isExpanded)}>{props.isExpanded ? 'X' : 'O'}</button>
    </div>
  )
}

export function HeightDropdown(props: { value: 's' | 'm' | 'l'; onChange: (v: 's' | 'm' | 'l') => void }): JSX.Element {
  const options = ['s', 'm', 'l'] as const
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e): void => props.onChange(e.target.value as 's' | 'm' | 'l')} value={props.value || undefined}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export function VariantsDropdown(props: { value: 'bg'; onChange: (v: 'bg') => void }): JSX.Element {
  const options = ['bg', 'bgSecondary', 'borderless', 'transparent'] as const
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e): void => props.onChange(e.target.value as 'bg')} value={props.value || undefined}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
