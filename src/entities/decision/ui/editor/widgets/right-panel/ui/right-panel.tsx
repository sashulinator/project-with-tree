import './right-panel.scss'

import { memo } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { RulesRes } from '~/entities/rules/types/rules-type'
import { AppearFrom } from '~/ui/animation'
import { GhostButton } from '~/ui/button'
import Chip from '~/ui/chip/ui/chip'
import { Close } from '~/ui/icon'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { Id, assertDefined, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { RuleList } from '..'
import { LinkListController, NodeListController } from '../../..'

RightPanelComponent.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  className?: string
  resizableProps: Omit<ResizableProps, 'direction'>
  nodeListController: NodeListController
  linkListController: LinkListController
  ruleList: RulesRes[]
  selectNodes: (ids: Id[]) => void
}

function RightPanelComponent(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates)

  // const [fullscreen, , , toogleFullscreen] = useBoolean(false)

  const selection = props.nodeListController.selection.value

  const selectedNodeId = [...selection][0]
  const nodeController = props.nodeListController.find(selectedNodeId)

  const inputProps = useChangeOnBlurStrategy({
    value: nodeController?.title.value || '',
    cannotBeEmpty: true,
    transparent: true,
    height: 'm',
    placeholder: 'Описание',
    onChange: (e) => nodeController?.title.set(e.currentTarget.value),
  })

  if (selection.length !== 1 && props.linkListController.editingRuleSet.value === undefined) {
    return null
  }

  // const SpacingWidthButton = fullscreen ? PrimaryButton : GhostButton

  return (
    <AppearFrom
      {...props.rootProps}
      className={c(
        props.className,
        props.rootProps?.className,
        RightPanelComponent.displayName
        // fullscreen && '--fullscreen'
      )}
      from={{ x: 33 }}
    >
      <Resizable {...props.resizableProps} direction='right' />
      <Flex dir='column' className='header' gap='m' crossAxis='center' mainAxis='space-between' width='100%'>
        <Flex className='buttons' gap='m' crossAxis='center'>
          <GhostButton
            round={true}
            height='l'
            onClick={(): void => {
              props.selectNodes([])
              props.linkListController.editingRuleSet.set(undefined)
            }}
          >
            <Close />
          </GhostButton>
        </Flex>
        {selection.length === 1 && (
          <>
            <Input {...inputProps} />
            {/* <SpacingWidthButton onClick={toogleFullscreen} round={true}>
                <SpacingWidth />
              </SpacingWidthButton> */}
          </>
        )}
        {props.linkListController.editingRuleSet.value && (
          <>
            <Flex dir='column' width='100%'>
              {props.linkListController.getEditingRuleState().rules.value.map((rule) => {
                return (
                  <Chip
                    type='div'
                    height='s'
                    key={rule.id}
                    onClick={(): void => {
                      const linkController = props.linkListController.getEditingRuleState()
                      linkController.rules.set(linkController.rules.value.filter((r) => r.id !== rule.id))
                    }}
                  >
                    {rule.keyName || rule.name}
                  </Chip>
                )
              })}
            </Flex>
            <RuleList
              list={props.ruleList.filter(
                (ruleRes) =>
                  !props.linkListController.getEditingRuleState().rules.value.some((r) => r.id === ruleRes.id)
              )}
              onSelect={(id): void => {
                const rule = props.ruleList.find((rule) => rule.id === id)
                assertDefined(rule)
                const linkController = props.linkListController.getEditingRuleState()
                linkController.rules.set([...linkController.rules.value, rule])
              }}
            />
          </>
        )}
      </Flex>
    </AppearFrom>
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListController.on('selection', update))
    uns.push(props.linkListController.on('editingRuleSet', update))
    uns.push(props.linkListController.on('rules', update))
  }
}

const RightPanel = memo(RightPanelComponent)
RightPanel.displayName = RightPanelComponent.displayName
export default RightPanel
