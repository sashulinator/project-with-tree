import Flex from '~/abstract/flex/ui/flex'
import Modal from '~/abstract/new-modal'
import { Config } from '~/storybook/types'
import { H1 } from '~/ui/heading'
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
        <Modal style={{ background: 'red' }} onClick={toggle} containerElement={document.body} opened={opened}>
          Hello World
        </Modal>
      </Flex>
    )
  },

  controls: [],
} satisfies Config<unknown>
