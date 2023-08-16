import './offer.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { SourceLinks, TargetLinks, Title, VariantPickerProps } from '../../..'

Filter.displayName = 'decisionCanvas-w-Node-v-Offer'

/**
 * Node вариант filter
 */
export default function Filter(props: VariantPickerProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      listState={props.nodeListState}
      state={props.state}
      onGestureDrug={props.onGestureDrug}
      className={Filter.displayName}
      title={<Title className='title' state={props.state} />}
      toolbar={
        <Toolbar
          listState={props.nodeListState}
          state={props.state}
          remove={(): void => props.remove(props.state.id)}
        />
      }
      targetLinks={
        <TargetLinks
          linkStates={props.linkListState}
          state={props.state}
          onNewJointClick={onNewJointClick('target')}
          onJointClick={onJointClick}
        />
      }
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.state.on('position', update))
  }

  function onJointClick(linkId: Id): void {
    if (props.linkListState.editingId.value) {
      props.linkListState.finishEditing(linkId)
    } else {
      const linkState = props.linkListState.get(linkId)
      if (!linkState.targetId.value) {
        props.linkListState.editingId.set(linkState.id)
      } else {
        props.linkListState.startEditing(linkId, props.state.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'target' | 'source'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkListState.editingId.value) {
        props.linkListState.finishNewLink(props.state.id)
      } else {
        props.linkListState.startNewLink(props.state.id, newLinkId, startLinkType)
      }
    }
  }
}
