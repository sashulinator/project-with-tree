import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import { data } from './data'

import { useBoolean } from '~/utils/hooks'
import { useState } from 'react'
import { MentionInput } from '~/ui/mentions'
import { Mention } from 'react-mentions'

export default function MentionPage(): JSX.Element {
  const [isFocused, , , toggleFocused] = useBoolean(false)
  const [isError, , , toggleError] = useBoolean(false)
  const [isDisabled, , , toggleDisabled] = useBoolean(false)
  const [transparent, , , toggleTransparent] = useBoolean(false)
  const [value, setValue] = useState<string>('')

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
          <MentionInput
            value={value}
            onChange={(_, v): void => {
              setValue(v)
            }}
            isError={isError}
            disabled={isDisabled}
            transparent={transparent}
          >
            <Mention
              trigger='@'
              data={data}
              style={{
                backgroundColor: '#cee4e5',
              }}
            />
          </MentionInput>
        </Section>
      </PageSection>
    </Flex>
  )
}
