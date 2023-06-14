import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { Node, NodeState } from '~/entities/point'

import { Joint } from '../../joint'

// import { RuleSet } from '../../rule-set'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SiftNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
}

/**
 * Node типа sift
 */
export function SiftNode(props: SiftNodeProps): JSX.Element {
  return (
    <Node
      state={props.state}
      scale={props.scale}
      left={
        <div className='incoming-links'>
          {props.linkStates.getLinksByTargetId(props.state.id).map((s) => {
            return <Joint key={s.id} linkId={s.id} />
          })}
        </div>
      }
    >
      {props.linkStates.getLinksBySourceId(props.state.id).map((s) => {
        return (
          <div key={s.id} className='flex' style={{ justifyContent: 'space-between' }}>
            <div>{s.rule.name}</div>
            <Joint linkId={s.id} />
          </div>
        )
      })}
    </Node>
  )
}
