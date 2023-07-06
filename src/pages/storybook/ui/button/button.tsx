// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import AbstractButton from '~/abstract/button'
import Flex from '~/abstract/flex/ui/flex'
import Button from '~/ui/button'
import { PrimaryButton } from '~/ui/button/variants/primary'
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
          <Button square={true}>
            <User />
          </Button>
          <PrimaryButton round={true}>
            <User />
          </PrimaryButton>
          <PrimaryButton>
            <Flex padding='0 1rem'>Hello</Flex>
          </PrimaryButton>
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
      <PageSection>
        <PrimaryButtonSection />
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
          <p>Расширяет Abstract.</p>
          <br />
          <ol>
            <li>высота s m l</li>
            <li>возможность делать кнопку квадратом</li>
            <li>возможность делать кнопку кругом</li>
            <li>Outline при фокусе</li>
          </ol>
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
          <p>Расширяет UnstyledButton.</p>
          <br />
          <ol>
            <li>Сдвиг при active</li>
            <li>Скругление</li>
          </ol>

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

function PrimaryButtonSection(): JSX.Element {
  const [height, setHeight] = useState<UnstyledButtonProps['height']>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>PrimaryButton</H2>
          <p>Расширяет Button.</p>
          <br />
          <ol>
            <li>Primary стили для hover и active</li>
            <li>Скругление</li>
          </ol>
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
      <PrimaryButton height={height || 'm'} square={square} round={round}>
        Button
      </PrimaryButton>
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
