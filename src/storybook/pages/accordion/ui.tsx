import { Config, Props } from '~/storybook/types'
import Accordion from '~/ui/accordion'
import { H1 } from '~/ui/heading'

interface State {
  expanded: boolean
  controlled: boolean
  content: boolean
  animation: boolean
  height: 's' | 'm' | 'l'
  variant: 'bg' | 'bgSecondary' | 'borderless' | 'transparent'
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
      state: { controlled, expanded, animation, content, height, variant },
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
        height={height}
        variants={[variant]}
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
    {
      name: 'height',
      input: 'select',
      options: ['s', 'm', 'l'],
      defaultValue: 's',
      style: { width: '200px' },
    },
    {
      name: 'variant',
      input: 'select',
      options: ['bg', 'bgSecondary', 'borderless', 'transparent'],
      defaultValue: 'cr',
      style: { width: '200px' },
    },
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
