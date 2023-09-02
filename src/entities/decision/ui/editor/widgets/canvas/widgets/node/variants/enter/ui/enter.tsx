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
      toggle={props.toggle}
      selectNodes={props.selectNodes}
      listState={props.nodeListController}
      onGestureDrug={props.onGestureDrug}
      state={props.state}
      className={Enter.displayName}
      title={<Title state={props.state} />}
      toolbar={<Toolbar state={props.state} />}
      sourceLinks={
        <SourceLinks
          linkListController={props.linkListController}
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
    if (props.linkListController.editingId.value) {
      props.linkListController.finishEditing(linkId)
    } else {
      const linkController = props.linkListController.get(linkId)
      if (!linkController.targetId.value) {
        props.linkListController.editingId.set(linkController.id)
      } else {
        props.linkListController.startEditing(linkId, props.state.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkListController.editingId.value) {
        props.linkListController.finishNewLink(props.state.id)
      } else {
        props.linkListController.startNewLink({ [startLinkType]: props.state.id, id: newLinkId, index: 0 })
      }
    }
  }
}
