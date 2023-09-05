import Flex from '~/abstract/flex/ui/flex'
import { Config } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import Modal from '~/ui/modal'
import { useBoolean } from '~/utils/hooks'

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

  element: function Element(): JSX.Element {
    const [opened, , , toggle] = useBoolean(false)

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <button onClick={toggle}>Toggle</button>
        <Modal firstFocused containerElement={document.body} onDismiss={toggle} opened={opened}>
          <button>button1</button>
          <div>Hello World</div>
          <button>button2</button>
        </Modal>
      </Flex>
    )
  },

  controls: [],
} satisfies Config<unknown>
