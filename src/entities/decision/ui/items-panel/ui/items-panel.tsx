import './items-panel.css'

import { useState } from 'react'

import { NodeState } from '~/entities/point'
import TextInput from '~/ui/text-input'
import UnstyledButton from '~/ui/unstyled-button'
import { Id } from '~/utils/core'

interface ItemPanelProps {
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
    <div className='ItemPanel'>
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
