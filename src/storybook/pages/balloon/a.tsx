import Balloon, { BalloonProps } from '~/abstract/balloon'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { c } from '~/utils/core'

interface State {
  placement: BalloonProps['placement']
}

export default {
  getName: (): string => Balloon.displayName || '',

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Balloon.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Balloon
        style={{
          background: 'red',
          position: 'absolute',
          zIndex: 2,
        }}
        arrow={
          <div
            className={c('ui-Balloon_arrow')}
            style={{
              position: 'absolute',
              background: 'red',
              width: '10px',
              height: '10px',
              transform: 'rotate(45deg)',
              zIndex: 1,
            }}
          />
        }
        {...state}
        // contentProps={{ style: { background: 'red' } }}
      >
        Content
      </Balloon>
    )
  },

  controls: [
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cr',
      style: { width: '200px' },
    },
  ],
} satisfies Config<State>
