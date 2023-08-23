import './target-links.css'

import { useState } from 'react'

import { Id, c, generateId } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Joint, State } from '../../..'
import { LinkListState } from '../../../../../../..'

TargetLink.displayName = 'decision-Editor-w-Canvas-w-Node-w-TargetLink'

export interface Props {
  className?: string
  state: State
  linkStates: LinkListState
  onNewJointClick: (linkState: Id) => void
  onJointClick: (id: Id) => void
}

export default function TargetLink(props: Props): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(generateId)

  useUpdate(subscribeOnUpdates)

  const sourceLinkStates = props.linkStates.getLinksByTargetId(props.state.id)
  const editingLinkState = props.linkStates.findEditingLinkState()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.state.id || editingLinkState?.targetId.value === props.state.id
  const isEditingHasTarget = Boolean(editingLinkState?.targetId.value)

  return (
    <div className={c(props.className, TargetLink.displayName)}>
      {sourceLinkStates.map((linkState) => {
        if (linkState.id === newLinkId) return null
        const isLinked = Boolean(linkState.sourceId.value)
        return (
          <Joint
            key={linkState.id}
            disabled={isEditingThisNode || isEditingHasTarget || (isLinked && Boolean(editingLinkState))}
            variant={isLinked ? 'linked' : 'unlinked'}
            linkId={linkState.id}
            onClick={(): void => props.onJointClick(linkState.id)}
          />
        )
      })}
      <Joint
        onClick={(): void => props.onNewJointClick(newLinkId)}
        disabled={isEditingThisNode || isEditingHasTarget}
        variant='new'
        linkId={newLinkId}
      />
    </div>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.linkStates.on('add', update)
    props.linkStates.on('remove', update)
    props.linkStates.on('index', update)
    props.linkStates.on('update', update)
    props.linkStates.on('targetId', update)
    props.linkStates.on('editingId', update)
    props.linkStates.on('sourceId', () => setNewLinkId(generateId()))
  }
}
