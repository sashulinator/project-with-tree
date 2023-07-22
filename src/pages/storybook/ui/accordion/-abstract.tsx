import Flex from '~/abstract/flex/ui/flex'

import { H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'
import { useBoolean } from '~/utils/hooks'

import Paragraph from '~/ui/paragraph'
import { Ol } from '~/ui/list/variants/ol'
import Accordion from '~/abstract/accordion/ui/accordion'

export function AbstractSection(): JSX.Element {
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
            </Ol>
          </>
        }
        toolbar={
          <Flex mainAxis='center' gap='l'>
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
