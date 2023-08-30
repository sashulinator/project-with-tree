import './control-group.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { SourceLinks, TargetLinks, Title, VariantPickerProps } from '../../..'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-ControlGroup'

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
      toolbar={<Toolbar listState={props.nodeListState} state={props.state} />}
      sourceLinks={
        <SourceLinks
          linkListState={props.linkListState}
          state={props.state}
          onNewJointClick={onNewJointClick('sourceId')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLinks
          linkStates={props.linkListState}
          state={props.state}
          onNewJointClick={onNewJointClick('targetId')}
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

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkListState.editingId.value) {
        props.linkListState.finishNewLink(props.state.id)
      } else {
        props.linkListState.startNewLink({ [startLinkType]: props.state.id, id: newLinkId, index: 0 })
      }
    }
  }
}
