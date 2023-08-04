import './target-links.css'

import uniqid from 'uniqid'
import { State } from '../../../models/state'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/entities/decision/ui/editor/widgets/-node'
import { useUpdate } from '~/utils/hooks'
import { useState } from 'react'
import { Id, c } from '~/utils/core'

TargetLink.displayName = 'decisionEditor-ui-Canvas-w-Node-w-TargetLink'

interface SourceLinkProps {
  className?: string
  state: State
  linkStates: LinkStateDictionary
  onNewJointClick: (linkState: Id) => void
  onJointClick: (id: Id) => void
}

export default function TargetLink(props: SourceLinkProps): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(uniqid)

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
    props.linkStates.on('sourceId', () => setNewLinkId(uniqid()))
  }
}
