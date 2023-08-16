import { useState } from 'react'

import Align, { AlignProps } from '~/abstract/align'
import Flex from '~/abstract/flex/ui/flex'
import { Config, Props } from '~/storybook/types'
import { setRefs } from '~/utils/react'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: AlignProps['points']
  portalSourceIntoTarget: boolean
  containerRelative: boolean
  containerOverflowHidden: boolean
  adjustY: boolean
  adjustX: boolean
  alwaysByViewport: boolean
}

export default {
  getName: (): string => Align.displayName,

  getPath: (): string => `/align`,

  getDescription: (): JSX.Element | string => 'Описание',

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoTarget, containerRelative, containerOverflowHidden, ...alignProps },
    } = props
    const [ref, setRef] = useState<null | HTMLElement>()

    console.log('alignProps', alignProps)

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
            <button ref={setRefs(setRef)}>Target</button>
            {ref && (
              <Align targetElement={ref} containerElement={portalSourceIntoTarget ? ref : undefined} {...alignProps}>
                <div style={{ width: '400px', height: '100px', background: 'red' }}>Source</div>
              </Align>
            )}
          </div>
        </Flex>
      </div>
    )
  },

  controls: [
    {
      name: 'sourcePoint',
      path: ['points', 0],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'tc',
      style: { width: '200px' },
    },
    {
      name: 'targetPoint',
      path: ['points', 1],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'bc',
      style: { width: '200px' },
    },
    { name: 'portalSourceIntoTarget', input: 'checkbox', defaultValue: false },
    { name: 'containerRelative', input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'adjustY', path: ['overflow', 'adjustY'], input: 'checkbox', defaultValue: false },
    { name: 'alwaysByViewport', path: ['overflow', 'alwaysByViewport'], input: 'checkbox', defaultValue: false },
    { name: 'containerOverflowHidden', input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
