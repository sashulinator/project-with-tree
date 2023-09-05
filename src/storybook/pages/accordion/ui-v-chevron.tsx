import { Config, Props } from '~/storybook/types'
import { ChevronAccordion } from '~/ui/accordion'
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
  getName: (): string => ChevronAccordion.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{ChevronAccordion.displayName}</H1>
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
      <ChevronAccordion
        header='Hello World'
        onExpandedChange={controlled ? toggleExpanded : undefined}
        isExpanded={controlled ? expanded : undefined}
        height={height}
        variants={[variant]}
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
      </ChevronAccordion>
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
