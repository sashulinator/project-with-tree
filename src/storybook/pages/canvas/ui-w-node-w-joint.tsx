import { Joint } from '~/entities/decision/ui/editor/widgets/node'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import Labeled from '~/ui/labeled/ui/labeled'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export default {
  getName: (): string => Joint.displayName || '',

  getPath: (): string => `/${Joint.displayName.toLowerCase()}`,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Joint.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    return (
      <>
        <Labeled label='new'>
          <Joint linkId='test' variant='new' {...props} />
        </Labeled>
        <Labeled label='linked'>
          <Joint linkId='test' variant='linked' {...props} />
        </Labeled>
        <Labeled label='unlinked'>
          <Joint linkId='test' variant='unlinked' {...props} />
        </Labeled>
      </>
    )
  },

  controls: [],
} satisfies Config<State>
