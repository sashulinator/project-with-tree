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
      toggle={props.toggle}
      selectNodes={emptyFn}
      list={props.nodeList}
      state={props.state}
      onGestureDrug={props.onGestureDrug}
      className={Filter.displayName}
      title={<Title className='title' state={props.state} />}
      toolbar={
        <Toolbar toggle={props.toggle} selectNodes={props.selectNodes} listState={props.nodeList} state={props.state} />
      }
      targetLinks={
        <TargetLinks
          linkControllers={props.linkList}
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
    if (props.linkList.editingId.value) {
      props.linkList.finishEditing(linkId)
    } else {
      const linkController = props.linkList.get(linkId)
      if (!linkController.targetId.value) {
        props.linkList.editingId.set(linkController.id)
      } else {
        props.linkList.startEditing(linkId, props.state.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.editingId.value) {
        props.linkList.finishNewLink(props.state.id)
      } else {
        props.linkList.startNewLink({ [startLinkType]: newLinkId, index: 0 })
      }
    }
  }
}
