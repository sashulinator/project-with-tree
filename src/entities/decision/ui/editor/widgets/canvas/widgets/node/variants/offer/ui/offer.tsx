import './offer.scss'

import { Id } from '~/utils/core'
import { emptyFn } from '~/utils/function/empty-fn'
import { useUpdate } from '~/utils/hooks'

import { Toolbar } from '..'
import Node, { FactoryProps, TargetLinks, Title } from '../../..'

Filter.displayName = 'decisionCanvas-w-Node-v-Offer'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      selectNodes={emptyFn}
      listState={props.nodeListController}
      state={props.state}
      onGestureDrug={props.onGestureDrug}
      className={Filter.displayName}
      title={<Title className='title' state={props.state} />}
      toolbar={<Toolbar listState={props.nodeListController} state={props.state} />}
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
        props.linkListController.startNewLink({ [startLinkType]: newLinkId, index: 0 })
      }
    }
  }
}
