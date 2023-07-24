import Flex from '~/abstract/flex/ui/flex'

import Section from '../../ui/section/ui/section'
import Chip from '~/ui/chip'

export default function ChipPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section h1='Chip' description='Чипсинка'>
        <Chip type='button' color='#13f453' height={'s'}>
          <Flex padding='0 2rem'>hello</Flex>
        </Chip>
      </Section>
    </Flex>
  )
}
