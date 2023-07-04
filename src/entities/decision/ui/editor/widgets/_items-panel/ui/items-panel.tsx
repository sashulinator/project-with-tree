import './items-panel.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { NodeState } from '~/entities/point'
import TextInput from '~/ui/text-input'
import UnstyledButton from '~/ui/unstyled-button'
import { Id } from '~/utils/core'

ItemPanel.displayName = 'decision-Editor-ItemPanel'

interface ItemPanelProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  nodeStateList: NodeState[]
  addNode: () => void
  centerNode: (id: Id) => void
}

export default function ItemPanel(props: ItemPanelProps): JSX.Element {
  const [value, setValue] = useState<string>('')

  const filtered = props.nodeStateList.filter(
    (node) => node.point.name.toUpperCase().indexOf(value.toUpperCase()) !== -1
  )

  return (
    <div {...props.rootProps} className={clsx(ItemPanel.displayName, props.rootProps?.className)}>
      <button onClick={props.addNode}>+</button>
      <div className='search'>
        <TextInput value={value} onChange={(ev): void => setValue(ev.currentTarget.value)} placeholder='Поиск' />
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