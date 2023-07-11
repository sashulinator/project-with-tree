// import Callout, { top } from '~/ui/callout'
import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'
import PageSection from '~/ui/page-section'
import { useBoolean } from '~/utils/hooks'

import Section from '../../section'
import Collapse from '~/abstract/collapse/ui/collapse'

export default function CollapsePage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>COLLAPSE</H1>
        <p>Компонент Сollapse.</p>
        Представляет собой два div&apos;a, где родительский подписывается на height ребенка и плавно реагирует на его
        изменение
      </PageSection>
      <PageSection>
        <DefaultCollapseSection />
      </PageSection>
    </Flex>
  )
}

function DefaultCollapseSection(): JSX.Element {
  const [expanded, , , toggleExpanded] = useBoolean(false)
  const [content, , , toggleContent] = useBoolean(false)
  const [animation, , , toggleAnimation] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>Abstract Collapse</H2>

          <Flex width='1rem' margin='1rem 0 0 0'>
            <Flex>
              <input type='checkbox' id='square' checked={expanded} onChange={toggleExpanded} />
              expanded
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
        </>
      }
    >
      <Collapse
        isExpanded={expanded}
        from={animation ? { opacity: 0, y: 0 } : undefined}
        to={animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined}
      >
        <p>Hello</p>
        <p>World</p>
        {content && (
          <>
            <p>How</p>
            <p>Are</p>
            <p>You</p>
          </>
        )}
      </Collapse>
    </Section>
  )
}
