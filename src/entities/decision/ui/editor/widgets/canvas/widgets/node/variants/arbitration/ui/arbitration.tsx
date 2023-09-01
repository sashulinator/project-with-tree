import './arbitration.scss'

import { Id } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, SourceLinks, TargetLinks, Title } from '../../..'

Filter.displayName = 'decision-Editor-w-Canvas-w-Node-v-Arbitration'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      selectNodes={props.selectNodes}
      listState={props.nodeListController}
      state={props.state}
      onGestureDrug={props.onGestureDrug}
      className={Filter.displayName}
      title={<Title className='title' state={props.state} />}
      toolbar={<Toolbar selectNodes={props.selectNodes} listState={props.nodeListController} state={props.state} />}
      sourceLinks={
        <SourceLinks
          linkListController={props.linkListController}
          state={props.state}
          onNewJointClick={onNewJointClick('sourceId')}
          onJointClick={onJointClick}
        />
      }
      targetLinks={
        <TargetLinks
          linkControllers={props.linkListController}
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
        // console.log(startLinkType, newLinkId, props.state.id)
        props.linkListController.startNewLink({ [startLinkType]: props.state.id, id: newLinkId, index: 0 })
      }
    }
  }
}
