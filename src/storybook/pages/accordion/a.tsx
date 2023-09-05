import Accordion from '~/abstract/accordion'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'

interface State {
  expanded: boolean
  controlled: boolean
  content: boolean
  animation: boolean
}

export default {
  getName: (): string => Accordion.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Accordion.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { controlled, expanded, animation, content },
      setState,
    } = props

    function toggleExpanded(): void {
      setState((s) => ({ ...s, expanded: !expanded }))
    }

    return (
      <Accordion
        onExpandedChange={controlled ? toggleExpanded : undefined}
        isExpanded={controlled ? expanded : undefined}
        renderHeader={_Header}
        headerProps={{ title: 'title' }}
        collapseProps={{
          from: animation ? { opacity: expanded ? 0 : 1, y: 0 } : undefined,
          to: animation ? { opacity: expanded ? 1 : 0, y: expanded ? 0 : 20 } : undefined,
        }}
      >
        <div className='test-Body' style={{ border: '1px solid red' }}>
          Hello world
          {content && (
            <>
              <br />
              MoreContent
            </>
          )}
        </div>
      </Accordion>
    )
  },

  controls: [
    { name: 'expanded', input: 'checkbox', defaultValue: true },
    { name: 'controlled', input: 'checkbox', defaultValue: true },
    { name: 'content', input: 'checkbox', defaultValue: false },
    { name: 'animation', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>

/**
 * Private
 */

interface _HeaderProps {
  title: string
  isExpanded: boolean
  setExpanded: (isExpanded: boolean) => void
}

function _Header(props: _HeaderProps): JSX.Element {
  return (
    <div className='test-Header' style={{ border: '1px solid red' }}>
      {props.title}
      <button onClick={(): void => props.setExpanded(!props.isExpanded)}>{props.isExpanded ? 'X' : 'O'}</button>
    </div>
  )
}
