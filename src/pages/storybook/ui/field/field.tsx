// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'

import { H1, H2 } from '~/ui/heading'

import PageSection from '~/ui/page-section'

import Section from '../../section'
import Field, { FieldProps } from '~/ui/field'
import { useBoolean } from '~/utils/hooks'
import Input from '~/ui/input'
import Link from '~/ui/link'
import { routes } from '../../routes'

export default function FieldPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>FIELD</H1>
        <p>Компонент Field</p>
        <p>Представляет собой div с состояниями readonly, disabled, error, focused</p>
        <br />
        <Section>
          <Flex dir='column'>
            <p>
              В <Link to={routes.input.getURL()}>Input</Link>
            </p>
            <Input height={'l'} />
          </Flex>
        </Section>
      </PageSection>
      <PageSection>
        <FieldSection />
      </PageSection>
    </Flex>
  )
}

function FieldSection(): JSX.Element {
  const [height, setHeight] = useState<FieldProps['height']>('m')
  const [isFocused, , , toggleFocused] = useBoolean(false)
  const [isError, , , toggleError] = useBoolean(false)
  const [isDisabled, , , toggleDisabled] = useBoolean(false)

  return (
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
            <HeightDropdown value={height} onChange={setHeight} />
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
          </Flex>
        </>
      }
    >
      <Field
        style={{ maxWidth: '15rem' }}
        height={height || 'm'}
        isFocused={isFocused}
        isError={isError}
        disabled={isDisabled}
      />
    </Section>
  )
}

// Private

export function HeightDropdown(props: {
  value: FieldProps['height']
  onChange: (v: FieldProps['height']) => void
}): JSX.Element {
  const options = ['s', 'm', 'l'] as const
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      onChange={(e): void => props.onChange(e.target.value as FieldProps['height'])}
      value={props.value || undefined}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
