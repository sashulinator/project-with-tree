import './offer.scss'

import { Id } from '~/utils/core'
import { emptyFn } from '~/utils/function/empty-fn'
import { useUpdate } from '~/utils/hooks'

import { FactoryProps, TargetLinks, Title } from '../../..'
import Node from '../../../ui/node'
import Toolbar from '../widgets/toolbar'

Filter.displayName = 'decisionCanvas-w-Node-v-Offer'

/**
 * Node вариант filter
 */
export default function Filter(props: FactoryProps): JSX.Element {
  useUpdate(subscribeOnUpdates)

  return (
    <Node
      toggle={props.toggle}
      select={emptyFn}
      list={props.list}
      controller={props.controller}
      onGestureDrag={props.onGestureDrag}
      className={Filter.displayName}
      title={<Title className='title' controller={props.controller} />}
      toolbar={<Toolbar toggle={props.toggle} select={props.select} list={props.list} controller={props.controller} />}
      targetLinks={
        <TargetLinks
          linkControllers={props.linkList}
          state={props.controller}
          onNewJointClick={onNewJointClick('targetId')}
          onJointClick={onJointClick}
        />
      }
    />
  )

  // Private

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.controller.on('position', update))
  }

  function onJointClick(linkId: Id): void {
    if (props.linkList.jointEditingId.value) {
      props.linkList.finishJointEditing(linkId)
    } else {
      const linkController = props.linkList.get(linkId)
      if (!linkController.targetId.value) {
        props.linkList.jointEditingId.set(linkController.id)
      } else {
        props.linkList.startJointEditing(linkId, props.controller.id)
      }
    }
  }

  function onNewJointClick(startLinkType: 'targetId' | 'sourceId'): (newLinkId: Id) => void {
    return (newLinkId: Id) => {
      if (props.linkList.jointEditingId.value) {
        props.linkList.finishNew(props.controller.id)
      } else {
        props.linkList.startNew({ [startLinkType]: newLinkId, index: 0 })
      }
    }
  }
}
