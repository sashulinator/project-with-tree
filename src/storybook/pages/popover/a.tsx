import { useState } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import Popover, { PopoverProps } from '~/abstract/popover'
import { setRefs } from '~/utils/react'

interface Props {
  sourcePosition: 'fixed' | 'absolute'
  points: PopoverProps['points']
  portalSourceIntoTarget: boolean
  containerRelative: boolean
  containerOverflowHidden: boolean
  opened: boolean
}

export default {
  description: (): JSX.Element | string => 'Описание',

  getName: (): string => Popover.displayName,

  getPath: (): string => `/popover`,

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

  element: function Element(props: Props): JSX.Element {
    const { portalSourceIntoTarget, containerRelative, containerOverflowHidden, ...popoverProps } = props
    const [ref, setRef] = useState<null | HTMLElement>()

    return (
      <div style={{ overflow: containerOverflowHidden ? 'hidden' : undefined }}>
        <Flex dir='column' width='3000px' height='1000px' padding='5rem'>
          <br />
          container
          <div
            style={{
              border: containerRelative ? '1px solid red' : '1px solid blue',
              position: containerRelative ? 'relative' : undefined,
              width: '200px',
              height: '200px',
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
}
