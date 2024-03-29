import './target-links.css'

import { useState } from 'react'

import { Id, c, generateId } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Controller, Joint } from '../../..'
import { LinkListController } from '../../../../../../..'

TargetLink.displayName = 'decision-Editor-w-Canvas-w-Node-w-TargetLink'

export interface Props {
  className?: string
  state: Controller
  linkControllers: LinkListController
  onNewJointClick: (linkController: Id) => void
  onJointClick: (id: Id) => void
}

export default function TargetLink(props: Props): JSX.Element {
  const [newLinkId, setNewLinkId] = useState(generateId)

  useUpdate(subscribeOnUpdates)

  const sourceLinkStates = props.linkControllers.getByTargetId(props.state.id)
  const editingLinkState = props.linkControllers.findJointEditingLink()
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
            className='joint'
            key={linkController.id}
            disabled={isEditingThisNode || isEditingHasTarget || (isLinked && Boolean(editingLinkState))}
            variant={isLinked ? 'linked' : 'unlinked'}
            linkId={linkController.id}
            onClick={(): void => props.onJointClick(linkController.id)}
          />
        )
      })}
      <Joint
        className='joint'
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
    props.linkControllers.on('jointEditingId', update)
    props.linkControllers.on('sourceId', () => setNewLinkId(generateId()))
  }
}
