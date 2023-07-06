// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import AbstractButton from '~/abstract/button'
import Flex from '~/abstract/flex/ui/flex'
import Button from '~/ui/button'
import { H1, H2 } from '~/ui/heading'
import { User } from '~/ui/icon'
import PageSection from '~/ui/page-section'
import UnstyledButton, { UnstyledButtonProps } from '~/ui/unstyled-button'
import { useBoolean } from '~/utils/hooks'

import Section from '../../section'

export default function ButtonPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>BUTTON</H1>
        Компонент кнопки
        <Section>
          <Button height='s' square={true}>
            <User />
          </Button>
        </Section>
      </PageSection>
      <PageSection>
        <Section
          header={
            <>
              <H2>Abstract</H2>
              Сбрасывает стили стандартного тега button
            </>
          }
        >
          <div style={{ border: '1px solid red' }}>
            <AbstractButton>Button</AbstractButton>
          </div>
        </Section>
      </PageSection>
      <PageSection>
        <UnstyledButtonSection />
      </PageSection>
      <PageSection>
        <ButtonSection />
      </PageSection>
    </Flex>
  )
}

function UnstyledButtonSection(): JSX.Element {
  const [height, setHeight] = useState<UnstyledButtonProps['height']>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>UnstyledButton</H2>
          Расширяет Abstract.
          <br />
          <br />
          Фичи: <br /> 1. высота s m l <br />
          2. возможность делать кнопку квадратом <br />
          3. возможность делать кнопку кругом <br />
          4. Outline при фокусе
          <Flex width='1rem' margin='1rem 0 0 0'>
            <HeightDropdown value={height} onChange={setHeight} />
            <Flex>
              <input type='checkbox' id='square' checked={square} onChange={toggleSquare} />
              Square
            </Flex>
            <Flex>
              <input type='checkbox' id='round' checked={round} onChange={toggleRound} />
              Round
            </Flex>
          </Flex>
        </>
      }
    >
      <UnstyledButton height={height || 'm'} square={square} round={round}>
        Button
      </UnstyledButton>
    </Section>
  )
}

function ButtonSection(): JSX.Element {
  const [height, setHeight] = useState<UnstyledButtonProps['height']>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>Button</H2>
          Фичи: <br /> 1. Стили для hover и active
          <Flex width='1rem' margin='1rem 0 0 0'>
            <HeightDropdown value={height} onChange={setHeight} />
            <Flex>
              <input type='checkbox' id='square' checked={square} onChange={toggleSquare} />
              Square
            </Flex>
            <Flex>
              <input type='checkbox' id='round' checked={round} onChange={toggleRound} />
              Round
            </Flex>
          </Flex>
        </>
      }
    >
      <Button height={height || 'm'} square={square} round={round}>
        Button
      </Button>
    </Section>
  )
}

// Private

export function HeightDropdown(props: {
  value: UnstyledButtonProps['height']
  onChange: (v: UnstyledButtonProps['height']) => void
}): JSX.Element {
  const options: UnstyledButtonProps['height'][] = ['s', 'm', 'l']
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e): void => props.onChange(e.target.value as UnstyledButtonProps['height'])} value={props.value}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
