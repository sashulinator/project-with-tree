import './left-panel.css'

import { memo } from 'react'

import { AppearFrom } from '~/ui/animation'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { Id, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { NodeList } from '..'
import { NodeListState } from '../../..'

LeftPanelComponent.displayName = 'decision-Editor-w-LeftPanel'

export interface Props {
  className?: string
  nodeListState: NodeListState
  resizableProps: Omit<ResizableProps, 'direction'>
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  centerNode: (id: Id) => void
  selectNodes: (id: Id[]) => void
}

function LeftPanelComponent(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates)
  if (props.nodeListState.searchQuery.value === '') {
    return null
  }

  return (
    <AppearFrom
      {...props.rootProps}
      className={c(props.className, props.rootProps?.className, LeftPanelComponent.displayName)}
      from={{ x: -33 }}
    >
      <Resizable {...props.resizableProps} direction='left' />
      <NodeList
        selectNodes={props.selectNodes}
        className='nodeList'
        centerNode={props.centerNode}
        nodeListState={props.nodeListState}
      />
    </AppearFrom>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('searchQuery', update))
  }
}

const LeftPanel = memo(LeftPanelComponent)
LeftPanel.displayName = LeftPanelComponent.displayName
export default LeftPanel
