import './enter.css'

import { Id } from '~/utils/dictionary'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, Title } from '../../..'

Enter.displayName = 'decisionCanvas-w-Node-v-Enter'

/**
 * Node вариант filter
 */
export default function Enter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      selectNodes={props.selectNodes}
      listState={props.nodeListState}
      onGestureDrug={props.onGestureDrug}
      state={props.state}
      className={Enter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} />}
      sourceLinks={
        <SourceLinks
          linkListState={props.linkListState}
          state={props.state}
          onNewJointClick={onNewJointClick('sourceId')}
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
