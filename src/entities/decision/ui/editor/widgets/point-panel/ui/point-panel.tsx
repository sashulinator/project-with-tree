import './point-panel.css'

import { clsx } from 'clsx'
import { useState } from 'react'

import { PrimaryButton } from '~/ui/button'
import { Plus } from '~/ui/icon'
import { Id } from '~/utils/core'
import Input from '~/ui/input'
import { NodeListState } from '../../..'
import { NodeList } from '..'
import { AppearFrom } from '~/ui/animation'
import Resizable from '~/ui/resizable/ui/resizable'

PointPanel.displayName = 'decision-Editor-w-PointPanel'

export interface PointPanelProps {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  nodeListState: NodeListState
  addNode: () => void
  centerNode: (id: Id) => void
}

export default function PointPanel(props: PointPanelProps): JSX.Element {
  const [value, setValue] = useState<string>('')

  return (
    <AppearFrom {...props.rootProps} className={clsx(PointPanel.displayName, props.rootProps?.className)} offset={-33}>
      <Resizable name='pointPanel' direction='left' defaultSize={400} />
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
