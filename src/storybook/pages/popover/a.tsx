import { useState } from 'react'

import Popover, { PopoverProps } from '~/abstract/popover'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: PopoverProps['points']
  portalSourceIntoContainer: boolean
  containerRelative: boolean
  containerOverflowHidden: boolean
  opened: boolean
}

export default {
  getName: (): string => Popover.displayName,

  getPath: (): string => `/popover`,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Popover.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoContainer, containerRelative, containerOverflowHidden, ...popoverProps },
    } = props

    const [containerRef, setContainerRef] = useState<null | HTMLElement>()

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          ref={setContainerRef}
          style={{
            overflow: containerOverflowHidden ? 'hidden' : undefined,
            border: containerRelative ? '1px solid red' : '1px solid blue',
            position: containerRelative ? 'relative' : undefined,
            padding: '200px 0 0 500px',
          }}
        >
          <Popover
            content={<div style={{ width: '400px', height: '100px', background: 'red' }}>Source</div>}
            containerElement={portalSourceIntoContainer ? containerRef : undefined}
            {...popoverProps}
          >
            <button>Target</button>
          </Popover>
        </div>
      </div>
    )
  },

  controls: [
    { name: 'opened', input: 'checkbox', defaultValue: true },
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cr',
      style: { width: '200px' },
    },
    { name: 'portalSourceIntoContainer', input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'adjustY', path: ['overflow', 'adjustY'], input: 'checkbox', defaultValue: false },
    { name: 'alwaysByViewport', path: ['overflow', 'alwaysByViewport'], input: 'checkbox', defaultValue: false },
    { name: 'containerOverflowHidden', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
