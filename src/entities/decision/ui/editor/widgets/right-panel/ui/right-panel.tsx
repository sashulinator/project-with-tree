import './right-panel.scss'

import { memo } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { AppearFrom } from '~/ui/animation'
import { GhostButton, PrimaryButton } from '~/ui/button'
import { Close, SpacingWidth } from '~/ui/icon'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { c } from '~/utils/core'
import { useBoolean, useUpdate } from '~/utils/hooks'

import { LinkListState, NodeListState } from '../../..'

RightPanelComponent.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
  resizableProps: Omit<ResizableProps, 'direction'>
  nodeListState: NodeListState
  linkListState: LinkListState
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
  console.log('editingRuleSet')

  if (selection.length !== 1 && props.linkListState.editingRuleSet === undefined) {
    return null
  }

  const SpacingWidthButton = fullscreen ? PrimaryButton : GhostButton

  return (
    <AppearFrom
      {...props.rootProps}
      className={c(
        props.className,
        props.rootProps?.className,
        RightPanelComponent.displayName,
        fullscreen && '--fullscreen'
      )}
      from={{ x: 33 }}
    >
      <Resizable {...props.resizableProps} direction='right' />
      <Flex className='header' gap='m' crossAxis='center' mainAxis='space-between' width='100%'>
        {selection.length === 1 && (
          <>
            <Input {...inputProps} />
            <Flex className='buttons' gap='m' crossAxis='center'>
              <SpacingWidthButton onClick={toogleFullscreen} round={true}>
                <SpacingWidth />
              </SpacingWidthButton>
              <GhostButton round={true} height='l' onClick={(): void => props.nodeListState.selection.set([])}>
                <Close />
              </GhostButton>
            </Flex>
          </>
        )}
        {props.linkListState.editingRuleSet.value && (
          <Flex>
            {props.linkListState.getEditingRuleState().rules.map((rule) => {
              return <div key={rule.id}>{rule.name}</div>
            })}
          </Flex>
        )}
      </Flex>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListState.on('selection', update))
    uns.push(props.linkListState.on('editingRuleSet', update))
  }
}

const RightPanel = memo(RightPanelComponent)
RightPanel.displayName = RightPanelComponent.displayName
export default RightPanel
