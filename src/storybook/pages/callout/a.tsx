import { forwardRef, useState } from 'react'

import Callout, { Point } from '~/abstract/callout'
import { Config, Props } from '~/storybook/types'
import { H1 } from '~/ui/heading'
import { setRefs } from '~/utils/react'

interface State {
  opened: boolean
  sourcePosition: 'fixed' | 'absolute'
  placement: Point
  portalSourceIntoContainer: boolean
  containerRelative: boolean
}

export default {
  getName: (): string => Callout.displayName,

  getDescription: function Description(): JSX.Element {
    return (
      <>
        <H1>{Callout.displayName}</H1>
        Добавьте описание
      </>
    )
  },

  element: function Element(props: Props<State>): JSX.Element {
    const {
      state: { portalSourceIntoContainer, containerRelative, ...compProps },
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
          <Callout
            {...compProps}
            contentProps={{}}
            containerElement={portalSourceIntoContainer ? containerRef : undefined}
            renderContent={forwardRef(function Element(props, ref): JSX.Element {
              return (
                <div
                  ref={setRefs(ref)}
                  style={{
                    background: 'red',
                    width: '200px',
                    height: '100px',
                  }}
                >
                  Placement: {props.placement}
                </div>
              )
            })}
          >
            <button>Target</button>
          </Callout>
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
