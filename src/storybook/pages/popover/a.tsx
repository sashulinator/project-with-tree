import { useState } from 'react'

import { DepricatedPopover, DepricatedPopoverProps } from '~/abstract/popover'
import { Config, Props } from '~/storybook/types'
import ConfigLink from '~/storybook/ui/config-link/ui/config-link'
import { H1 } from '~/ui/heading'

import aAlign from '../align/a'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: DepricatedPopoverProps['points']
  portalSourceIntoContainer: boolean
  containerRelative: boolean
  opened: boolean
}

export default {
  getName: (): string => DepricatedPopover.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{DepricatedPopover.displayName}</H1>
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
          <DepricatedPopover
            content={<div style={{ width: '400px', height: '100px', background: 'red' }}>Source</div>}
            containerElement={portalSourceIntoContainer ? containerRef : undefined}
            {...popoverProps}
          >
            <button>Target</button>
          </DepricatedPopover>
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
