import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import DndCanvas from '~/ui/dnd-canvas/ui/dnd-canvas'
import { H1 } from '~/ui/heading'

interface State {}

export default {
  getName: (): string => DndCanvas.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{DndCanvas.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      // state
    } = props

    return (
      <Flex dir='column'>
        <DndCanvas></DndCanvas>
      </Flex>
    )
  },

  controls: [],
} satisfies Config<State>

/**
 * Private
 */
