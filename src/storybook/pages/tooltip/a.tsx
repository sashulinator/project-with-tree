import { forwardRef } from 'react'

import Balloon from '~/abstract/balloon'
import Flex from '~/abstract/flex/ui/flex'
import Tooltip, { TooltipProps } from '~/abstract/tooltip'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

interface State {
  delay: number
  placement: TooltipProps['placement']
}

export default {
  getName: (): string => Tooltip.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Tooltip.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const { state } = props

    return (
      <Flex dir='column' gap='xl' width='100%'>
        <Tooltip
          className='story-Tooltip'
          renderBalloon={forwardRef(function Element(props, ref): JSX.Element {
            const placement = state.placement
            return (
              <Balloon
                className={c(props.className)}
                placement={placement}
                ref={setRefs(ref)}
                contentProps={{
                  style: {
                    background: 'red',
                    position: 'absolute',
                    zIndex: 2,
                  },
                }}
                renderArrow={forwardRef(function Element(props, ref): JSX.Element {
                  return (
                    <div
                      ref={setRefs(ref)}
                      style={{
                        position: 'absolute',
                        background: 'blue',
                        width: '10px',
                        height: '10px',
                        transform: 'rotate(45deg)',
                        zIndex: 1,
                      }}
                    />
                  )
                })}
                // contentProps={{ style: { background: 'red' } }}
              >
                <div style={{ width: '200px', height: '200px' }}>Content</div>
              </Balloon>
            )
          })}
          {...state}
        >
          <button>Hello</button>
        </Tooltip>
      </Flex>
    )
  },

  controls: [
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tl',
      style: { width: '200px' },
    },
    {
      name: 'delay',
      input: 'input',
      defaultValue: 300,
      width: '200px',
      type: 'number',
    },
  ],
} satisfies Config<State>
