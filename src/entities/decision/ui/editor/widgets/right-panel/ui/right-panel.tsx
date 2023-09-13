import './right-panel.scss'

import { memo } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { RulesRes } from '~/entities/rule/types/rules-type'
import { AppearFrom } from '~/ui/animation'
import { GhostButton } from '~/ui/button'
import Chip from '~/ui/chip/ui/chip'
import { Close } from '~/ui/icon'
import Resizable, { ResizableProps } from '~/ui/resizable'
import { Id, assertDefined, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { RuleList } from '..'
import { LinkListController, NodeListController } from '../../..'

RightPanelComponent.displayName = 'decision-Editor-w-RightPanel'

export interface Props {
  className?: string
  rootProps?: React.HTMLAttributes<HTMLDivElement>
  resizableProps: Omit<ResizableProps, 'direction'>
  nodeList: NodeListController
  linkList: LinkListController
  ruleList: RulesRes[]
  selectNodes: (ids: Id[]) => void
}

function RightPanelComponent(props: Props): JSX.Element | null {
  useUpdate(subscribeOnUpdates, [props.linkList.editingRuleSet.value])

  // const [fullscreen, , , toogleFullscreen] = useBoolean(false)

  if (props.linkList.editingRuleSet.value === undefined) {
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
              props.linkList.editingRuleSet.set(undefined)
            }}
          >
            <Close />
          </GhostButton>
        </Flex>
        {props.linkList.editingRuleSet.value && (
          <>
            <Flex dir='column' width='100%'>
              {props.linkList.getEditingRuleState().rules.value.map((rule) => {
                return (
                  <Chip
                    type='div'
                    height='s'
                    key={rule.id}
                    onClick={(): void => {
                      const linkController = props.linkList.getEditingRuleState()
                      const newRules = linkController.rules.value.filter((r) => r.id !== rule.id)
                      linkController.rules.set(newRules)
                    }}
                  >
                    {rule.keyName || rule.name}
                  </Chip>
                )
              })}
            </Flex>
            <RuleList
              list={props.ruleList.filter(
                (ruleRes) => !props.linkList.getEditingRuleState().rules.value.some((r) => r.id === ruleRes.id)
              )}
              onSelect={(id): void => {
                const rule = props.ruleList.find((rule) => rule.id === id)
                assertDefined(rule)
                const linkController = props.linkList.getEditingRuleState()
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
    uns.push(props.linkList.on('editingRuleSet', update))
    uns.push(props.linkList.on('rules', update))
  }
}

const RightPanel = memo(RightPanelComponent)
RightPanel.displayName = RightPanelComponent.displayName
export default RightPanel
