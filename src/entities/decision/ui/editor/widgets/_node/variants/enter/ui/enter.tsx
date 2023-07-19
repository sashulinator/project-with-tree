import './enter.css'

import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links/state/state'
import { Joint, Node, NodeState } from '~/entities/decision/ui/editor/widgets/_node'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'

export interface EnterNodeProps {
  state: NodeState
  x: number | string
  y: number | string
  linkStates: LinkStateDictionary
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Node типа enter
 */
export function EnterNode(props: EnterNodeProps): JSX.Element {
  const { linkStates, ...nodeProps } = props
  const targetLinks = linkStates.getLinksByTargetId(props.state.id)
  const sourceLinks = linkStates.getLinksBySourceId(props.state.id)

  return (
    <Node
      {...nodeProps}
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
                <Joint linkId={s.id} variant={Boolean(s.targetId.value) ? 'linked' : 'unlinked'} />
              </div>
            )
          })}
        </div>
      }
    ></Node>
  )
}
