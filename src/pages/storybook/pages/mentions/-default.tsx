import Flex from '~/abstract/flex/ui/flex'

import { H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'

import { data } from './data'

import { useBoolean } from '~/utils/hooks'
import { useState } from 'react'
import MentionsInput, { Mention } from '~/ui/mention-input'

export default function Default(): JSX.Element {
  const [isError, , , toggleError] = useBoolean(false)
  const [isDisabled, , , toggleDisabled] = useBoolean(false)
  const [transparent, , , toggleTransparent] = useBoolean(false)
  const [value, setValue] = useState<string>('')

  return (
    <PageSection>
      <H2>{MentionsInput.displayName}</H2>
      <Section
        header={
          <>
            <H2>Все состояния</H2>

            <Flex width='1rem' margin='1rem 0 0 0'>
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
        <MentionsInput
          value={value}
          onChange={(_, v): void => {
            setValue(v)
          }}
          isError={isError}
          disabled={isDisabled}
          transparent={transparent.toString()}
        >
          <Mention trigger='@' data={data} />
        </MentionsInput>
      </Section>
    </PageSection>
  )
}
