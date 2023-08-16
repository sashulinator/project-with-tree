import { useState } from 'react'

import Popover, { PopoverProps } from '~/abstract/popover'
import { configToPath } from '~/storybook/lib'
import { Config, Props } from '~/storybook/types'
import ConfigLink from '~/storybook/ui/config-link/ui/config-link'
import { H1 } from '~/ui/heading'
import Link from '~/ui/link'

import aAlign from '../align/a'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: PopoverProps['points']
  portalSourceIntoContainer: boolean
  containerRelative: boolean
  opened: boolean
}

export default {
  getName: (): string => Popover.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Popover.displayName}</H1>
        Расширяет <ConfigLink config={aAlign} />
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoContainer, containerRelative, ...popoverProps },
    } = props

    const [containerRef, setContainerRef] = useState<null | HTMLElement>()

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          ref={setContainerRef}
          style={{
            overflow: 'hidden',
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
  ],
} satisfies Config<State>
