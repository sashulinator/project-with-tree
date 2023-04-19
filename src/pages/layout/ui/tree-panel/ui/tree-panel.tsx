import React from 'react'

import { EventNames, LayoutState, ROOT_ID } from '~/entities/layout'

interface TreePanelProps {
  layoutState: LayoutState
}

export default function TreePanel(props: TreePanelProps): JSX.Element {
  return (
    <div className='TreePanel'>
      <button
        onClick={(): void => {
          props.layoutState.mitt?.emit(EventNames.setItem, {
            id: ROOT_ID,
            name: 'RootBox',
            componentName: 'RootBox',
            props: {
              style: {
                width: '100%',
                padding: '40px',
              },
            },
            children: [1, '323'],
          })
        }}
      >
        Target
      </button>
      <button
        onClick={(): void => {
          props.layoutState.mitt?.emit(EventNames.setItem, {
            id: 1,
            name: 'textInput-1',
            componentName: 'TextInput',
            props: {
              defaultValue: '333',
              height: 's',
            },
          })
        }}
      >
        Target2
      </button>
    </div>
  )
}
