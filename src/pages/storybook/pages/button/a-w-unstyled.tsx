import { UnstyledButton } from '~/abstract/button'
import Flex from '~/abstract/flex/ui/flex'

import Section from '../../ui/section/ui/section'

export const features = ['Outline', 'Высота s m l', 'Форма круга', 'Форма квадрата']

export function AButtonWUnstyledPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section
        features={['Сброс стилей']}
        h2={UnstyledButton.displayName}
        description='Кнопка без стилей. В том числе без outline'
      >
        <UnstyledButton style={{ border: '1px solid red' }}>Hello</UnstyledButton>
      </Section>
    </Flex>
  )
}
