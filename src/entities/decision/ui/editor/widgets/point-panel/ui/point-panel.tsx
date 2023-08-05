import './point-panel.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { UnstyledButton } from '~/abstract/button'

import { PrimaryButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id } from '~/utils/core'
import Input from '~/ui/input'
import { NodeMapperState } from '../../..'

PointPanel.displayName = 'decision-Editor-w-PointPanel'

export interface PointPanelProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  nodeStates: NodeMapperState
  addNode: () => void
  centerNode: (id: Id) => void
}

export default function PointPanel(props: PointPanelProps): JSX.Element {
  const [value, setValue] = useState<string>('')

  const filtered = Object.values(props.nodeStates.items).filter(
    (node) => node.point.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
  )

  return (
    <div {...props.rootProps} className={clsx(PointPanel.displayName, props.rootProps?.className)}>
      <div style={{ display: 'flex', alignItems: 'center', padding: 'var(--xl)' }}>
        <div className='search'>
          <Input value={value} onChange={(ev): void => setValue(ev.currentTarget.value)} placeholder='Поиск' />
        </div>
        <PrimaryButton onClick={props.addNode} round={true} height='l' style={{ marginLeft: 'var(--l)' }}>
          <Plus />
        </PrimaryButton>
      </div>
      <ul>
        {filtered.map((state) => {
          return (
            <li key={state.id}>
              <UnstyledButton onClick={(): void => props.centerNode(state.id)}>{state.point.name}</UnstyledButton>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
