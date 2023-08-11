import './right-panel.scss'

import { clsx } from 'clsx'

import Flex from '~/abstract/flex/ui/flex'

import { AppearFrom } from '~/ui/animation'
import { GhostButton, PrimaryButton } from '~/ui/button'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { SpacingWidth, Close } from '~/ui/icon'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'

import { useBoolean, useUpdate } from '~/utils/hooks'

import { NodeListState } from '../../..'

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

  if (selection.size !== 1) {
    return null
  }

  const SpacingWidthButton = fullscreen ? PrimaryButton : GhostButton

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
      <Flex className='header' gap='m' crossAxis='center' mainAxis='space-between' width='100%'>
        <Input {...inputProps} />
        <Flex className='buttons' gap='m' crossAxis='center'>
          <SpacingWidthButton onClick={toogleFullscreen} round={true}>
            <SpacingWidth />
          </SpacingWidthButton>
          <GhostButton round={true} height='l' onClick={(): void => props.nodeListState.selection.set(new Set())}>
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
