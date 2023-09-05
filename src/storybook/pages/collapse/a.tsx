import Collapse from '~/abstract/collapse'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'

interface State {
  expanded: boolean
  content: boolean
  animation: boolean
}

export default {
  getName: (): string => Collapse.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Collapse.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { expanded, animation, content },
    } = props

    return (
      <Collapse
        isExpanded={expanded}
        from={animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined}
        to={animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined}
      >
        <p>Hello</p>
        <p>World</p>
        {content && (
          <>
            <p>How</p>
            <p>Are</p>
            <p>You</p>
          </>
        )}
      </Collapse>
    )
  },

  controls: [
    { name: 'expanded', input: 'checkbox', defaultValue: true },
    { name: 'content', input: 'checkbox', defaultValue: false },
    { name: 'animation', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
