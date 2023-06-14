import { IsDragEvent } from '~/abstract/canvas'
import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { Node, NodeState } from '~/entities/point'

// import { RuleSet } from '../../rule-set'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SiftNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
  left?: React.ReactNode
  children?: React.ReactNode
  isDrag?: (event: IsDragEvent) => boolean
}

/**
 * Node типа sift
 */
export function SiftNode(props: SiftNodeProps): JSX.Element {
  return (
    <Node {...props}>
      {/* {props.state.ruleList.value?.map((rule) => {
        return (
          <RuleSet
            key={rule.id}
            id={rule.id}
            isLinked={Boolean(rule.pointId)}
            onAddLink={(): void => {
              props.decisionState.editingLink.add({
                rule,
                sourceState: props.state,
                sourceRuleId: rule.id,
              })
            }}
          >
            {rule.name}
          </RuleSet>
        )
      })} */}
    </Node>
  )
}
