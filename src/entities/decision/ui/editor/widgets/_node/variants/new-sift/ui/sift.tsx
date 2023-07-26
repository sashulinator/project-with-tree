import './sift.css'

import { Id } from '~/utils/dictionary'

import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { Joint, NewNode } from '~/ui/canvas'
import { GhostButton } from '~/ui/button'

import { LinkStateDictionary } from '../../../../_links'
import { NodeState } from '../../..'

import Toolbar from '../widgets/toolbar'
import Title from '../widgets/title'

NewSiftNode.displayName = 'decisionCanvas-w-Node-v-Sift'

export interface NewSiftNodeProps {
  state: NodeState
  x: number | string
  y: number | string
  dataId: Id
  linkStates: LinkStateDictionary
  remove: () => void
  onGestureDrug: (event: GestureDragEvent) => void
}

/**
 * Node типа sift
 */
export function NewSiftNode(props: NewSiftNodeProps): JSX.Element {
  const { remove, linkStates, ...nodeProps } = props

  const targetLinks = linkStates.getLinksByTargetId(props.state.id)

  return (
    <NewNode
      {...nodeProps}
      className={NewSiftNode.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} remove={remove} />}
      sourceLinks={
        <>
          <GhostButton round={true} height='s'>
            <Joint variant='new' linkId={'new-id'} />
          </GhostButton>
          {targetLinks.map((linkState) => {
            return (
              <div key={linkState.id}>
                <GhostButton round={true} height='s'>
                  <Joint variant={linkState.sourceId ? 'linked' : 'unlinked'} linkId={'id'} />
                </GhostButton>
              </div>
            )
          })}
        </>
      }
      targetLinks={
        <div style={{ display: 'flex', width: '100%', alignItems: 'end', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <GhostButton round={true} height='s'>
              <Joint variant='new' linkId={'id'} />
            </GhostButton>
          </div>
          <GhostButton round={true} height='s'>
            <Joint variant='linked' linkId={'id'} />
          </GhostButton>
        </div>
      }
    />
  )

  // Private
}
