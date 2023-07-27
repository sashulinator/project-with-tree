import { GhostButton } from '~/ui/button'

import { NodeState } from '../../../../..'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { RuleLinkState } from '~/entities/decision/ui/editor/widgets/_link'
import { useState } from 'react'

interface SourceLinkProps {
  state: NodeState
  linkStates: LinkStateDictionary
  onNewJointClick: (linkState: RuleLinkState) => void
}

export default function TargetLink(props: SourceLinkProps): JSX.Element {
  const [newLink, setLink] = useState(() => RuleLinkState.createDefaultInstance({ targetId: props.state.id }))

  useUpdate(subscribeOnUpdates)
  useUpdate(subscribeOnNewLink, [newLink])

  const sourceLinkStates = props.linkStates.getLinksByTargetId(props.state.id)
  const editingLinkState = props.linkStates.findEditingLinkState()
  const isEditingThisNode =
    editingLinkState?.sourceId.value === props.state.id || editingLinkState?.targetId.value === props.state.id
  const isEditingHasTarget = Boolean(editingLinkState?.targetId.value)

  return (
    <>
      <GhostButton
        round={true}
        disabled={isEditingThisNode || isEditingHasTarget}
        height='s'
        onClick={(): void => props.onNewJointClick(newLink)}
      >
        <Joint disabled={isEditingThisNode || isEditingHasTarget} variant='new' linkId={newLink.id} />
      </GhostButton>
      {sourceLinkStates.map((linkState) => {
        if (linkState.id === newLink.id) return null
        const isLinked = Boolean(linkState.sourceId)

        return (
          <GhostButton
            disabled={isEditingThisNode || isEditingHasTarget || (isLinked && Boolean(editingLinkState))}
            key={linkState.id}
            round={true}
            height='s'
          >
            <Joint
              disabled={isEditingThisNode || isEditingHasTarget || (isLinked && Boolean(editingLinkState))}
              variant={isLinked ? 'linked' : 'unlinked'}
              linkId={'id'}
            />
          </GhostButton>
        )
      })}
    </>
  )

  // Private

  function subscribeOnUpdates(update: () => void): void {
    props.linkStates.onAll(update)
  }

  function subscribeOnNewLink(_: unknown, uns: (() => void)[]): void {
    uns.push(
      newLink.on('sourceId', ({ value }) => {
        if (value) setLink(RuleLinkState.createDefaultInstance({ targetId: props.state.id }))
      })
    )
  }
}
