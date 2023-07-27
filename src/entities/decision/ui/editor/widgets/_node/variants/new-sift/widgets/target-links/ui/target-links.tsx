import { GhostButton } from '~/ui/button'

import { NodeState } from '../../../../..'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'

interface SourceLinkProps {
  state: NodeState
  linkStates: LinkStateDictionary
}

export default function TargetLink(props: SourceLinkProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  const sourceLinkStates = props.linkStates.getLinksByTargetId(props.state.id)

  return (
    <>
      <GhostButton round={true} height='s'>
        <Joint variant='new' linkId={'new-id'} />
      </GhostButton>
      {sourceLinkStates.map((linkState) => {
        return (
          <GhostButton key={linkState.id} round={true} height='s'>
            <Joint variant={linkState.sourceId ? 'linked' : 'unlinked'} linkId={'id'} />
          </GhostButton>
        )
      })}
    </>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.linkStates.onAll(update)
  }
}
