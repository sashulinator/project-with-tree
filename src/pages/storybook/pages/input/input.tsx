// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { H1, H2 } from '~/ui/heading'
import { User } from '~/ui/icon'
import Input, { Clearable, InputProps, Password } from '~/ui/input'
import Link from '~/ui/link'
import PageSection from '~/ui/page-section'
import { useBoolean } from '~/utils/hooks'

import Section from '../../section'
import { routes } from '../../shared/routes'

export default function InputPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>Input</H1>
        <p>Компонент Input</p>
        <p>Представляет собой input элемент</p>
        <Section>
          <Flex dir='column' gap='m'>
            <Input left={<User style={{ margin: '0 0 0 var(--m)' }} />} />
            <Password />
            <Clearable />
          </Flex>
        </Section>
      </PageSection>
      <PageSection>
        <InputSection />
      </PageSection>
    </Flex>
  )
}

function InputSection(): JSX.Element {
  const [height, setHeight] = useState<InputProps['height']>('m')
  const [isError, , , toggleError] = useBoolean(false)
  const [transparent, , , toggleTransparent] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>Все состояния</H2>
          <p>Расширяет AbstaractInput.</p>
          <br />
          <p>Использует компоненты:</p>
          <ol>
            <li>
              <Link to={routes.field.getURL()}>Field</Link>
            </li>
          </ol>
          <br />
          <ol>
            <li>Высоты s m l</li>
          </ol>
          <Flex width='1rem' margin='1rem 0 0 0'>
            <HeightDropdown value={height} onChange={setHeight} />
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
      <Input height={height || 'm'} isError={isError} transparent={transparent} />
    </Section>
  )
}

// Private

export function HeightDropdown(props: {
  value: InputProps['height']
  onChange: (v: InputProps['height']) => void
}): JSX.Element {
  const options = ['s', 'm', 'l'] as const
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      onChange={(e): void => props.onChange(e.target.value as InputProps['height'])}
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
