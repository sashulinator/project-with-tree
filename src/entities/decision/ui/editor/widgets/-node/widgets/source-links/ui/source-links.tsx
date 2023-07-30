import './source-links.css'

import { NodeState } from '../../../../_node'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/entities/decision/ui/editor/widgets/-node'
import { useUpdate } from '~/utils/hooks'
import { useState } from 'react'
import uuid from 'uuid-random'
import { Id, c } from '~/utils/core'

SourceLink.displayName = 'decisionEditor-ui-Canvas-w-Node-w-SourceLink'

interface SourceLinkProps {
  className?: string
  state: NodeState
  linkStates: LinkStateDictionary
  hideNewLink?: boolean
  onNewJointClick: (newLinkId: Id) => void
  onJointClick: (linkId: Id) => void
}

export default function SourceLink(props: SourceLinkProps): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(uuid)

  useUpdate(subscribeOnUpdates)

  const editingLinkState = props.linkStates.findEditingLinkState()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.state.id || editingLinkState?.targetId.value === props.state.id
  const isEditingHasSource = Boolean(editingLinkState?.sourceId.value)

  const sourceLinkStates = props.linkStates
    .getLinksBySourceId(props.state.id)
    .sort((a, b) => (a.index.value < b.index.value ? -1 : 1))

  // if (props.state.id === 'id2') {
  //   console.log('isEditingHasSource', isEditingHasSource, editingLinkState)
  // }

  return (
    <div className={c(props.className, SourceLink.displayName)}>
      {sourceLinkStates.map((linkState) => {
        if (linkState.id === newLinkId) return null
        const isLinked = Boolean(linkState.targetId.value)

        return (
          <div className='rule' key={linkState.id}>
            <div>{linkState.rule.name}</div>
            <Joint
              disabled={isEditingThisNode || isEditingHasSource || (isLinked && Boolean(editingLinkState))}
              variant={isLinked ? 'linked' : 'unlinked'}
              linkId={linkState.id}
              onClick={(): void => props.onJointClick(linkState.id)}
            />
          </div>
        )
      })}
      {!props.hideNewLink && (
        <Joint
          onClick={(): void => props.onNewJointClick(newLinkId)}
          disabled={isEditingThisNode || isEditingHasSource}
          variant='new'
          linkId={newLinkId}
        />
      )}
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.linkStates.onAll(() => setTimeout(update))
    props.linkStates.on('targetId', () => setNewLinkId(uuid()))
  }
}
