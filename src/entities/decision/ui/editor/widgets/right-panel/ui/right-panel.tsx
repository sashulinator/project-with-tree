import './right-panel.scss'

import { memo, useRef } from 'react'

import Flex from '~/abstract/flex/ui/flex'
import { RulesRes } from '~/entities/rule/types/rules-type'
import { AppearFrom } from '~/ui/animation'
import { GhostButton } from '~/ui/button'
import { Close, Trash } from '~/ui/icon'
import Resizable, { ResizableProps } from '~/ui/resizable'
import Tooltip from '~/ui/tooltip'
import { Id, assertDefined, c } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { RuleList } from '..'
import { LinkListController, NodeListController } from '../../..'
import { _removeLink } from '../../../lib/_remove-link'
import ArbitrationProps from '../widgets/arbitration-props/ui/arbitration-props'

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
  useUpdate(subscribeOnUpdates, [props.linkList.rulesEditingId.value])

  const tooltipContainerRef = useRef<HTMLElement>(null)

  const selectedNode =
    props.nodeList.selection.value.length === 1 ? props.nodeList.get(props.nodeList.selection.value[0]) : null

  const isArbitrationProps = props.nodeList.selection.value.length === 1 && selectedNode?.point.level === 'arbitration'

  // const [fullscreen, , , toogleFullscreen] = useBoolean(false)

  if (props.linkList.rulesEditingId.value === undefined && !isArbitrationProps) {
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
      <Flex dir='column' gap='m' crossAxis='center' mainAxis='space-between' width='100%'>
        <Flex margin='0 0 30px 0' width='100%' className='header' gap='m' crossAxis='center' mainAxis='space-between'>
          <GhostButton
            round={true}
            height='l'
            onClick={(): void => {
              assertDefined(props.linkList.rulesEditingId.value)
              _removeLink(props, props.linkList.rulesEditingId.value)
              props.linkList.rulesEditingId.set(undefined)
            }}
          >
            <Trash />
          </GhostButton>
          <GhostButton
            round={true}
            height='l'
            onClick={(): void => {
              props.selectNodes([])
              props.linkList.rulesEditingId.set(undefined)
              props.nodeList.selection.set([])
            }}
          >
            <Close />
          </GhostButton>
        </Flex>
        {props.nodeList.selection.value.length === 1 && props.nodeList.selection.value[0] && <ArbitrationProps />}
        {props.linkList.rulesEditingId.value && (
          <>
            <Flex dir='column' width='100%' gap='l'>
              {props.linkList.getRulesEditingLink().rules.value.map((rule) => {
                return (
                  <div
                    key={rule.id}
                    ref={setRefs(tooltipContainerRef)}
                    style={{
                      display: 'flex',
                      overflow: 'hidden',
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 'var(--l) 0 var(--l) var(--l)',
                    }}
                  >
                    <div style={{ width: '85%' }}>
                      <Tooltip placement='tl' containerElement={tooltipContainerRef.current} contents={rule.name}>
                        <div style={{ overflow: 'hidden', width: '90%', whiteSpace: 'nowrap' }}>{rule.name}</div>
                      </Tooltip>
                      <Tooltip placement='tl' containerElement={tooltipContainerRef.current} contents={rule.keyName}>
                        <div style={{ overflow: 'hidden', width: '90%', opacity: '0.7' }}>{rule.keyName}</div>
                      </Tooltip>
                    </div>
                    <GhostButton
                      round={true}
                      onClick={(): void => {
                        const linkController = props.linkList.getRulesEditingLink()
                        const newRules = linkController.rules.value.filter((r) => r.id !== rule.id)
                        linkController.rules.set(newRules)
                      }}
                    >
                      <Close />
                    </GhostButton>
                  </div>
                )
              })}
            </Flex>
            <RuleList
              list={props.ruleList.filter(
                (ruleRes) => !props.linkList.getRulesEditingLink().rules.value.some((r) => r.id === ruleRes.id)
              )}
              onSelect={(id): void => {
                const rule = props.ruleList.find((rule) => rule.id === id)
                assertDefined(rule)
                const linkController = props.linkList.getRulesEditingLink()
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
    uns.push(props.linkList.on('rulesEditingId', update))
    uns.push(props.linkList.on('rules', update))
    uns.push(props.nodeList.on('selection', update))
  }
}

const RightPanel = memo(RightPanelComponent)
RightPanel.displayName = RightPanelComponent.displayName
export default RightPanel
