import './right-panel.scss'

import { clsx } from 'clsx'
import { memo } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { AppearFrom } from '~/ui/animation'
import { GhostButton, PrimaryButton } from '~/ui/button'
import { Close, SpacingWidth } from '~/ui/icon'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { useBoolean, useUpdate } from '~/utils/hooks'

import { NodeListState } from '../../..'

RightPanelComponent.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
  resizableProps: Omit<ResizableProps, 'direction'>
  nodeListState: NodeListState
}

function RightPanelComponent(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  const [fullscreen, , , toogleFullscreen] = useBoolean(false)

  const selection = props.nodeListState.selection.value

  const selectedNodeId = [...selection][0]
  const nodeState = props.nodeListState.find(selectedNodeId)

  const inputProps = useChangeOnBlurStrategy({
    value: nodeState?.title.value || '',
    cannotBeEmpty: true,
    transparent: true,
    height: 'm',
    placeholder: 'Описание',
    onChange: (e) => nodeState?.title.set(e.currentTarget.value),
  })

  if (selection.length !== 1) {
    return null
  }

  const SpacingWidthButton = fullscreen ? PrimaryButton : GhostButton

  return (
    <AppearFrom
      {...props.rootProps}
      className={clsx(
        props.className,
        props.rootProps?.className,
        RightPanelComponent.displayName,
        fullscreen && '--fullscreen'
      )}
      offsetX={33}
    >
      <Resizable {...props.resizableProps} direction='right' />
      <Flex className='header' gap='m' crossAxis='center' mainAxis='space-between' width='100%'>
        <Input {...inputProps} />
        <Flex className='buttons' gap='m' crossAxis='center'>
          <SpacingWidthButton onClick={toogleFullscreen} round={true}>
            <SpacingWidth />
          </SpacingWidthButton>
          <GhostButton round={true} height='l' onClick={(): void => props.nodeListState.selection.set([])}>
            <Close />
          </GhostButton>
        </Flex>
      </Flex>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
  }
}

const RightPanel = memo(RightPanelComponent)
RightPanel.displayName = RightPanelComponent.displayName
export default RightPanel
