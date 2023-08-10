import './right-panel.css'

import { clsx } from 'clsx'

import { AppearFrom } from '~/ui/animation'
import Resizable from '~/ui/resizable/ui/resizable'
import { NodeListState } from '../../..'
import { useBoolean, useUpdate } from '~/utils/hooks'
import { useState } from 'react'
import Checkbox from '~/ui/checkbox/ui/checkbox'

RightPanel.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
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
      <Resizable name='rightPanel' direction='right' defaultSize={400} />
      <Checkbox checked={fullscreen} placeholder='fullscreen' onChange={toogleFullscreen} />
      <div className='toolbar'>Toolbar</div>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
  }
}
