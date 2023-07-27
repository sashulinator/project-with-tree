import { GhostButton } from '~/ui/button'

import { NodeState } from '../../../../..'
import { LinkStateDictionary } from '~/entities/decision/ui/editor/widgets/_links'
import { Joint } from '~/ui/canvas'
import { useUpdate } from '~/utils/hooks'
import { useState } from 'react'
import { RuleLinkState } from '~/entities/decision/ui/editor/widgets/_link'

interface SourceLinkProps {
  state: NodeState
  linkStates: LinkStateDictionary
  onNewJointClick: (linkState: RuleLinkState) => void
}

export default function SourceLink(props: SourceLinkProps): JSX.Element {
  const [newLink, setLink] = useState(() => RuleLinkState.createDefaultInstance({ sourceId: props.state.id }))

  useUpdate(subscribeOnUpdates)
  useUpdate(subscribeOnNewLink, [newLink])

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
      <Joint
        onClick={(): void => props.onNewJointClick(newLink)}
        disabled={isEditingThisNode || isEditingHasSource}
        variant='new'
        linkId={newLink.id}
      />
      {sourceLinkStates.map((linkState) => {
        if (linkState.id === newLink.id) return null
        const isLinked = Boolean(linkState.targetId)
        return (
          <Joint
            key={linkState.id}
            disabled={isEditingThisNode || isEditingHasSource || (isLinked && Boolean(editingLinkState))}
            variant={isLinked ? 'linked' : 'unlinked'}
            linkId={'id'}
          />
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
      newLink.on('targetId', ({ value }) => {
        if (value) setLink(RuleLinkState.createDefaultInstance({ sourceId: props.state.id }))
      })
    )
  }
}
