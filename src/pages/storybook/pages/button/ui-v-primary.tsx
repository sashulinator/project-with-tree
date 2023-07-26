import { useState } from 'react'

import Button from '~/ui/button'
import Flex from '~/abstract/flex/ui/flex'
import { PrimaryButton } from '~/ui/button/variants/primary'

import { useBoolean } from '~/utils/hooks'

import { HeightDropdown } from '../../ui/height-dropdown'
import Section from '../../ui/section/ui/section'
import { features as uiButtonFeatures } from './ui'
import { features as abstractButtonFeatures } from './a-w-unstyled'

export default function UIButtonVPrimaryPage(): JSX.Element {
  const [height, setHeight] = useState<'m'>('m')
  const [round, , , toggleRound] = useBoolean(false)
  const [square, , , toggleSquare] = useBoolean(false)
  const [padding, setPadding] = useState<'m'>('m')

  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section
        h2={PrimaryButton.displayName}
        description='Кнопка внимания'
        extends={[...abstractButtonFeatures, ...uiButtonFeatures]}
        extendsName={Button.displayName}
        features={['Cтили состояний hover и active']}
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
        <Flex dir='column'>
          <PrimaryButton height={height} square={square} round={round} padding={padding}>
            Primary
          </PrimaryButton>
        </Flex>
      </Section>
    </Flex>
  )
}
