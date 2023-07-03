import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links/state/state'
import { Node, NodeState } from '~/entities/point'

import { Joint } from '../../../widgets/joint'

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
      dataId={props.state.id}
      left={
        <div className='targetLinks'>
          {targetLinks.map((s) => {
            return <Joint key={s.id} linkId={s.id} variant='linked' />
          })}
        </div>
      }
      right={
        <div className='outcomming-links'>
          {sourceLinks.map((s) => {
            return (
              <div key={s.id} className='flex' style={{ justifyContent: 'space-between' }}>
                <Joint linkId={s.id} variant={Boolean(s.rule.value.targetId) ? 'linked' : 'unlinked'} />
              </div>
            )
          })}
        </div>
      }
    ></Node>
  )
}
