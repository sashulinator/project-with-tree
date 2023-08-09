import './enter.css'

import { Id } from '~/utils/dictionary'

import Node, { VariantPickerProps, Title, SourceLinks } from '../../..'
import { Toolbar } from '..'

import { useUpdate } from '~/utils/hooks'

Enter.displayName = 'decisionCanvas-w-Node-v-Enter'

/**
 * Node вариант filter
 */
export default function Enter(props: VariantPickerProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      onGestureDrug={props.onGestureDrug}
      state={props.state}
      className={Enter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} remove={(): void => props.remove(props.state.id)} />}
      sourceLinks={
        <SourceLinks
          hideNewLink={true}
          linkListState={props.linkListState}
          state={props.state}
          onNewJointClick={onNewJointClick('source')}
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