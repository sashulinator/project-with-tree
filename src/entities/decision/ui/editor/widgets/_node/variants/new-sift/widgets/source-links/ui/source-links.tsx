import { NodeState } from '../../../../..'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { useState } from 'react'
import uuid from 'uuid-random'
import { Id } from '~/utils/core'

interface SourceLinkProps {
  state: NodeState
  linkStates: LinkStateDictionary
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
    <>
      {sourceLinkStates.map((linkState) => {
        if (linkState.id === newLinkId) return null
        const isLinked = Boolean(linkState.targetId.value)

        return (
          <Joint
            key={linkState.id}
            disabled={isEditingThisNode || isEditingHasSource || (isLinked && Boolean(editingLinkState))}
            variant={isLinked ? 'linked' : 'unlinked'}
            linkId={'id'}
            onClick={(): void => props.onJointClick(linkState.id)}
          />
        )
      })}
      <Joint
        onClick={(): void => props.onNewJointClick(newLinkId)}
        disabled={isEditingThisNode || isEditingHasSource}
        variant='new'
        linkId={newLinkId}
      />
    </>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.linkStates.onAll(() => setTimeout(update))
    props.linkStates.on('targetId', ({ value }) => {
      if (value) setNewLinkId(uuid())
    })
  }
}
