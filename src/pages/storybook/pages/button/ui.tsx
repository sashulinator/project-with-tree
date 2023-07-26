import { useState } from 'react'

import Button from '~/ui/button'
import Flex from '~/abstract/flex/ui/flex'

import { useBoolean } from '~/utils/hooks'

import { HeightDropdown } from '../../ui/height-dropdown'
import Section from '../../ui/section/ui/section'
import AbstractButton from '~/abstract/button'
import { features as abstractButtonFeatures } from './abstract'
export const features = ['Сдвиг на 1px при нажатии', 'Border raduis', 'text-transform: uppercase']

export function ButtoUIPage(): JSX.Element {
  const [height, setHeight] = useState<'m'>('m')
  const [padding, setPadding] = useState<'m'>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)

  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section
        h1={Button.displayName}
        description='Кнопка'
        extends={abstractButtonFeatures}
        extendsName={AbstractButton.displayName}
        features={features}
        toolbar={
          <Flex width='1rem' margin='1rem 0 0 0'>
            height
            <HeightDropdown value={height} onChange={setHeight} />
            padding
            <HeightDropdown value={padding} onChange={setPadding} />
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
        <Button height={height} square={square} round={round} padding={padding}>
          Hello
        </Button>
      </Section>
    </Flex>
  )
}
