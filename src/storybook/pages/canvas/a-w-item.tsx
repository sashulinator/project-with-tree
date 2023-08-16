import { Item } from '~/abstract/canvas'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'

interface State {
  contentAdded: boolean
  x: number
  y: number
}

export default {
  getName: (): string => Item.displayName || '',

  getPath: (): string => `/${Item.displayName?.toLowerCase() || ''}`,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Item.displayName}</H1>
        Размер `foreignObject` подстраивается под размер детей
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { contentAdded, ...compProps },
    } = props

    return (
      <svg width='100%' height='100%' style={{ border: '1px solid red' }}>
        <Item dataId={'test'} {...compProps}>
          <div style={{ border: '1px solid blue' }}>
            Hello{' '}
            {contentAdded && (
              <>
                <br />
                World
              </>
            )}
          </div>
        </Item>
      </svg>
    )
  },

  controls: [
    {
      name: 'x',
      input: 'input',
      defaultValue: 20,
      width: '200px',
      type: 'number',
    },
    {
      name: 'y',
      input: 'input',
      defaultValue: 20,
      width: '200px',
      type: 'number',
    },
    { name: 'contentAdded', input: 'checkbox', defaultValue: true },
  ],
} satisfies Config<State>
