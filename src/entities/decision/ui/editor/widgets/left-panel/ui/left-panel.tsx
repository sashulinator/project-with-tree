import './left-panel.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { AppearFrom } from '~/ui/animation'
import { PrimaryButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import Input from '~/ui/input'
import { Id } from '~/utils/core'
import Resizable, { ResizableProps } from '~/ui/resizable'

import { NodeListState } from '../../..'
import { NodeList } from '..'

LeftPanel.displayName = 'decision-Editor-w-LeftPanel'

export interface Props {
  className?: string
  nodeListState: NodeListState
  resizableProps: Omit<ResizableProps, 'direction'>
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  addNode: () => void
  centerNode: (id: Id) => void
}

export default function LeftPanel(props: Props): JSX.Element {
  const [value, setValue] = useState<string>('')

  return (
    <AppearFrom
      {...props.rootProps}
      className={clsx(props.className, props.rootProps?.className, LeftPanel.displayName)}
      offset={-33}
    >
      <Resizable {...props.resizableProps} direction='left' />
      <div className='toolbar'>
        <div className='search'>
          <Input
            transparent={true}
            value={value}
            onChange={(ev): void => setValue(ev.currentTarget.value)}
            placeholder='Поиск'
          />
        </div>
        <PrimaryButton onClick={props.addNode} round={true} height='l' style={{ marginLeft: 'var(--l)' }}>
          <Plus />
        </PrimaryButton>
      </div>
      <NodeList
        className='nodeList'
        centerNode={props.centerNode}
        searchQuery={value}
        nodeListState={props.nodeListState}
      />
    </AppearFrom>
  )
}
