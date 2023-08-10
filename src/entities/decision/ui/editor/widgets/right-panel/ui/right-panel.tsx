import './right-panel.css'

import { clsx } from 'clsx'

import { AppearFrom } from '~/ui/animation'
import Resizable from '~/ui/resizable/ui/resizable'
import { NodeListState } from '../../..'
import { useUpdate } from '~/utils/hooks'

RightPanel.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
  nodeListState: NodeListState
}

export default function RightPanel(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const selection = props.nodeListState.selection.value

  if (selection.size !== 1) {
    return null
  }

  return (
    <AppearFrom
      {...props.rootProps}
      className={clsx(props.className, props.rootProps?.className, RightPanel.displayName)}
      offset={33}
    >
      <Resizable name='rightPanel' direction='right' defaultSize={400} />
      <div className='toolbar'>Toolbar</div>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
  }
}
