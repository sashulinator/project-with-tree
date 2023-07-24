import { useState } from 'react'

import Button, { UnstyledButton } from '~/abstract/button'
import Flex from '~/abstract/flex/ui/flex'

import { useBoolean } from '~/utils/hooks'

import { HeightDropdown } from '../../ui/height-dropdown'
import Section from '../../ui/section/ui/section'

export const features = ['Outline', 'Высота s m l', 'Форма круга', 'Форма квадрата']

export function ButtoAbstractPage(): JSX.Element {
  const [height, setHeight] = useState<'m'>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section
        h1={Button.displayName}
        description={`Абстрактная кнопка с базовым функционалом. Использует виджет ${UnstyledButton.displayName || ''}`}
        features={features}
        toolbar={
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
        }
      >
        <Button height={height} square={square} round={round}>
          Hello
        </Button>
      </Section>
    </Flex>
  )
}
