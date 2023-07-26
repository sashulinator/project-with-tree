import { GhostButton } from '~/ui/button'

import { NodeState } from '../../../../..'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/ui/canvas'

interface SourceLinkProps {
  state: NodeState
  linkStates: LinkStateDictionary
}

export default function SourceLink(props: SourceLinkProps): JSX.Element {
  const sourcelinkStates = props.linkStates.getLinksBySourceId(props.state.id)

  return (
    <>
      <GhostButton round={true} height='s'>
        <Joint variant='new' linkId={'new-id'} />
      </GhostButton>
      {sourcelinkStates.map((linkState) => {
        return (
          <GhostButton key={linkState.id} round={true} height='s'>
            <Joint variant={linkState.sourceId ? 'linked' : 'unlinked'} linkId={'id'} />
          </GhostButton>
        )
      })}
    </>
  )
}
