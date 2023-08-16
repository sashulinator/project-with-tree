import { useState } from 'react'

import Align, { AlignProps } from '~/abstract/align'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { setRefs } from '~/utils/react'

interface State {
  sourcePosition: 'fixed' | 'absolute'
  points: AlignProps['points']
  everflow: AlignProps['overflow']
  portalSourceIntoContainer: boolean
  containerRelative: boolean
}

export default {
  getName: (): string => Align.displayName,

  getPath: (): string => `/align`,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Align.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoContainer, containerRelative, ...compProps },
    } = props
    const [ref, setRef] = useState<null | HTMLElement>()
    const [containerRef, setContainerRef] = useState<null | HTMLElement>()

    console.log('alignProps', compProps)

    return (
      <div style={{ overflow: 'hidden', width: '100%', height: '100%' }} ref={setContainerRef}>
        <div
          style={{
            border: containerRelative ? '1px solid red' : '1px solid blue',
            position: containerRelative ? 'relative' : undefined,
          }}
        >
          <button ref={setRefs(setRef)}>Target</button>
          {ref && (
            <Align
              targetElement={ref}
              containerElement={portalSourceIntoContainer ? containerRef : undefined}
              {...compProps}
            >
              <div style={{ width: '400px', height: '100px', background: 'red' }}>Source</div>
            </Align>
          )}
        </div>
      </div>
    )
  },

  controls: [
    {
      name: 'sourcePoint',
      path: ['points', 0],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cr',
      style: { width: '200px' },
    },
    {
      name: 'targetPoint',
      path: ['points', 1],
      input: 'select',
      options: ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'cc', 'cl', 'cr'],
      defaultValue: 'cl',
      style: { width: '200px' },
    },
    { name: 'portalSourceIntoContainer', input: 'checkbox', defaultValue: false },
    { name: 'containerRelative', input: 'checkbox', defaultValue: false },
    { name: 'adjustX', path: ['overflow', 'adjustX'], input: 'checkbox', defaultValue: false },
    { name: 'adjustY', path: ['overflow', 'adjustY'], input: 'checkbox', defaultValue: false },
    { name: 'alwaysByViewport', path: ['overflow', 'alwaysByViewport'], input: 'checkbox', defaultValue: false },
  ],
} satisfies Config<State>
