import { LinkStateDictionary } from '~/entities/decision/ui/links/state/state'
import { Node, NodeState } from '~/entities/point'

import { Joint } from '../../joint'

export interface EnterNodeProps {
  state: NodeState
  scale: number
  linkStates: LinkStateDictionary
}

/**
 * Node типа enter
 */
export function EnterNode(props: EnterNodeProps): JSX.Element {
  const targetLinks = props.linkStates.getLinksByTargetId(props.state.id)
  const sourceLinks = props.linkStates.getLinksBySourceId(props.state.id)

  return (
    <Node
      state={props.state}
      scale={props.scale}
      className='--enter'
      left={
        <div className='target-links'>
          {targetLinks.map((s) => {
            return <Joint key={s.id} linkId={s.id} isLinked={true} />
          })}
        </div>
      }
      right={
        <div className='outcomming-links'>
          {sourceLinks.map((s) => {
            return (
              <div key={s.id} className='flex' style={{ justifyContent: 'space-between' }}>
                <Joint linkId={s.id} isLinked={Boolean(s.rule.value.targetId)} />
              </div>
            )
          })}
        </div>
      }
    ></Node>
  )
}
