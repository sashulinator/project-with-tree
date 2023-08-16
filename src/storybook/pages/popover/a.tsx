import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import Popover, { PopoverProps } from '~/abstract/popover'
import { Config, Props } from '~/storybook/types'
import { setRefs } from '~/utils/react'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: PopoverProps['points']
  portalSourceIntoTarget: boolean
  containerRelative: boolean
  containerOverflowHidden: boolean
  opened: boolean
}

export default {
  getName: (): string => Popover.displayName,

  getPath: (): string => `/popover`,

  getDescription: (): JSX.Element | string => 'Описание',

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoTarget, containerRelative, containerOverflowHidden, ...popoverProps },
    } = props

    const [ref, setRef] = useState<null | HTMLElement>()

    return (
      <div style={{ overflow: containerOverflowHidden ? 'hidden' : undefined }}>
        <Flex dir='column' width='300px' height='100px' padding='5rem'>
          <br />
          container
          <div
            style={{
              border: containerRelative ? '1px solid red' : '1px solid blue',
              position: containerRelative ? 'relative' : undefined,
              width: '2000px',
              height: '2000px',
            }}
          >
            <Popover
              content={<div style={{ width: '400px', height: '100px', background: 'red' }}>Source</div>}
              containerElement={portalSourceIntoTarget ? ref : undefined}
              {...popoverProps}
            >
              <button ref={setRefs(setRef)}>Target</button>
            </Popover>
          </div>
        </Flex>
      </div>
    )
  },

  controls: [
    { name: 'opened', input: 'checkbox', defaultValue: true },
    {
      name: 'placement',
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tc',
      style: { width: '200px' },
    },
    { name: 'portalSourceIntoTarget', input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'adjustY', path: ['overflow', 'adjustY'], input: 'checkbox', defaultValue: false },
    { name: 'alwaysByViewport', path: ['overflow', 'alwaysByViewport'], input: 'checkbox', defaultValue: false },
    { name: 'containerOverflowHidden', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
