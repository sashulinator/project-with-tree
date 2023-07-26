import { GhostButton } from '~/ui/button'
import Flex from '~/abstract/flex/ui/flex'
import { PrimaryButton } from '~/ui/button/variants/primary'

import { User } from '~/ui/icon'

import Section from '../../ui/section/ui/section'

export default function ButtonPage(): JSX.Element {
  return (
    <Flex padding='0 1rem 30vh 1rem' dir='column'>
      <Section h1='Button' description='Компонент кнопки'>
        <GhostButton square={true}>
          <User />
        </GhostButton>
        <PrimaryButton round={true}>
          <User />
        </PrimaryButton>
        <Flex dir='column' gap='s'>
          <PrimaryButton padding={'s'}>Hello</PrimaryButton>
          <PrimaryButton padding={'m'}>Hello</PrimaryButton>
          <PrimaryButton padding={'l'}>Hello</PrimaryButton>
        </Flex>
      </Section>
    </Flex>
  )
}
