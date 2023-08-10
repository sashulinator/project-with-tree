import './right-panel.scss'

import { clsx } from 'clsx'

import { AppearFrom } from '~/ui/animation'
import Resizable from '~/ui/resizable/ui/resizable'
import { NodeListState } from '../../..'
import { useBoolean, useUpdate } from '~/utils/hooks'
import Checkbox from '~/ui/checkbox/ui/checkbox'
import { ResizableProps } from '~/ui/resizable'

RightPanel.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
  resizableProps: Omit<ResizableProps, 'direction'>
  nodeListState: NodeListState
}

export default function RightPanel(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const [fullscreen, , , toogleFullscreen] = useBoolean(false)

  const selection = props.nodeListState.selection.value

  if (selection.size !== 1) {
    return null
  }

  return (
    <AppearFrom
      {...props.rootProps}
      className={clsx(
        props.className,
        props.rootProps?.className,
        RightPanel.displayName,
        fullscreen && '--fullscreen'
      )}
      offset={33}
    >
      <Resizable {...props.resizableProps} direction='right' />
      <Checkbox checked={fullscreen} placeholder='fullscreen' onChange={toogleFullscreen} />
      <div className='toolbar'>Toolbar</div>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
  }
}
