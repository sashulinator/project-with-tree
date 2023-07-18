import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import Mentions from '~/ui/mentions/ui/mentions'
import { data } from './data'

import { useBoolean } from '~/utils/hooks'

export default function MentionPage(): JSX.Element {
  const [isFocused, , , toggleFocused] = useBoolean(false)
  const [isError, , , toggleError] = useBoolean(false)
  const [isDisabled, , , toggleDisabled] = useBoolean(false)
  const [transparent, , , toggleTransparent] = useBoolean(false)

  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>Mention</H1>
        <p>Компонент Mention</p>
        <br />
        <Section
          header={
            <>
              <H2>Все состояния</H2>
              <p>Расширяет AbstaractField.</p>
              <br />
              <ol>
                <li>Высоты s m l</li>
              </ol>
              <Flex width='1rem' margin='1rem 0 0 0'>
                <Flex>
                  <input type='checkbox' id='focus' checked={isFocused} onChange={toggleFocused} />
                  isFocused
                </Flex>
                <Flex>
                  <input type='checkbox' id='error' checked={isDisabled} onChange={toggleDisabled} />
                  isDisabled
                </Flex>
                <Flex>
                  <input type='checkbox' id='error' checked={isError} onChange={toggleError} />
                  isError
                </Flex>
                <Flex>
                  <input type='checkbox' id='error' checked={transparent} onChange={toggleTransparent} />
                  transparent
                </Flex>
              </Flex>
            </>
          }
        >
          <Mentions
            data={data}
            isFocused={isFocused}
            isError={isError}
            disabled={isDisabled}
            transparent={transparent}
            focusedChange={toggleFocused}
          />
        </Section>
      </PageSection>
    </Flex>
  )
}
