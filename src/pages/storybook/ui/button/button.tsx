// import Callout, { top } from '~/ui/callout'
import { useState } from 'react'

import Button, { ButtonProps, GhostButton } from '~/ui/button'
import Flex from '~/abstract/flex/ui/flex'
import { PrimaryButton } from '~/ui/button/variants/primary'
import { H1, H2 } from '~/ui/heading'
import { User } from '~/ui/icon'
import PageSection from '~/ui/page-section'
import { useBoolean } from '~/utils/hooks'

import Section from '../../section'

export default function ButtonPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <PageSection>
        <H1>BUTTON</H1>
        Компонент кнопки
        <Section>
          <GhostButton square={true}>
            <User />
          </GhostButton>
          <PrimaryButton round={true}>
            <User />
          </PrimaryButton>
          <PrimaryButton>
            <Flex padding='0 1rem'>Hello</Flex>
          </PrimaryButton>
        </Section>
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

function ButtonSection(): JSX.Element {
  const [height, setHeight] = useState<ButtonProps['height']>('m')
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
  const [height, setHeight] = useState<ButtonProps['height']>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Section
      header={
        <>
          <H2>Варианты</H2>
          <p>Расширяют Button.</p>
          <br />
          <ol>
            <li>Cтили состояний hover и active</li>
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
      <Flex dir='column'>
        <PrimaryButton height={height || 'm'} square={square} round={round} style={{ marginBottom: '1rem' }}>
          Primary
        </PrimaryButton>
        <GhostButton height={height || 'm'} square={square} round={round}>
          Ghost
        </GhostButton>
      </Flex>
    </Section>
  )
}

// Private

export function HeightDropdown(props: {
  value: ButtonProps['height']
  onChange: (v: ButtonProps['height']) => void
}): JSX.Element {
  const options: ButtonProps['height'][] = ['s', 'm', 'l']
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e): void => props.onChange(e.target.value as ButtonProps['height'])} value={props.value}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
