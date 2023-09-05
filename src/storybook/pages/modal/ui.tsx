import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import { PrimaryButton } from '~/ui/button'
import { H1 } from '~/ui/heading'
import Input from '~/ui/input'
import Modal from '~/ui/modal'
import { useBoolean } from '~/utils/hooks'

interface State {
  firstFocused: boolean
}

export default {
  getName: (): string => Modal.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Modal.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    const [opened, , , toggle] = useBoolean(false)

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <button onClick={toggle}>Toggle</button>
        <Modal {...state} containerElement={document.body} onDismiss={toggle} opened={opened}>
          <Flex padding='var(--l)' width='50vw' height='50vh' gap='m' dir='column' style={{ border: '2px solid blue' }}>
            <Input />
            <PrimaryButton>Hello</PrimaryButton>
          </Flex>
        </Modal>
      </Flex>
    )
  },

  controls: [{ name: 'firstFocused', input: 'checkbox', defaultValue: false }],
} satisfies Config<State>
