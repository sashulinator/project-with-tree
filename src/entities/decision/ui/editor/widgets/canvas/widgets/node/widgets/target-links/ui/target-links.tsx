import './target-links.css'

import { useState } from 'react'

import { Id, c, generateId } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Joint, State } from '../../..'
import { LinkListController } from '../../../../../../..'

TargetLink.displayName = 'decision-Editor-w-Canvas-w-Node-w-TargetLink'

export interface Props {
  className?: string
  state: State
  linkControllers: LinkListController
  onNewJointClick: (linkController: Id) => void
  onJointClick: (id: Id) => void
}

export default function TargetLink(props: Props): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(generateId)

  useUpdate(subscribeOnUpdates)

  const sourceLinkStates = props.linkControllers.getLinksByTargetId(props.state.id)
  const editingLinkState = props.linkControllers.findEditingLinkState()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.state.id || editingLinkState?.targetId.value === props.state.id
  const isEditingHasTarget = Boolean(editingLinkState?.targetId.value)

  return (
    <div className={c(props.className, TargetLink.displayName)}>
      {sourceLinkStates.map((linkController) => {
        if (linkController.id === newLinkId) return null
        const isLinked = Boolean(linkController.sourceId.value)
        return (
          <Joint
            key={linkController.id}
            disabled={isEditingThisNode || isEditingHasTarget || (isLinked && Boolean(editingLinkState))}
            variant={isLinked ? 'linked' : 'unlinked'}
            linkId={linkController.id}
            onClick={(): void => props.onJointClick(linkController.id)}
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
    props.linkControllers.on('add', update)
    props.linkControllers.on('remove', update)
    props.linkControllers.on('index', update)
    props.linkControllers.on('update', update)
    props.linkControllers.on('targetId', update)
    props.linkControllers.on('editingId', update)
    props.linkControllers.on('sourceId', () => setNewLinkId(generateId()))
  }
}
